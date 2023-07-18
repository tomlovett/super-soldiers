class MissionSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :soldiers

  def soldiers
    MissionsSoldier.where(mission_id: object.id).joins(:soldier).select(
      :id, :soldier_id, :first_name, :last_name, :nickname, :hits, :misses, :kills, :was_KIA, :was_promoted
    )
  end
end
