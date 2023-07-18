class MissionSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :soldiers

  def soldiers
    MissionsSoldier.where(mission_id: object.id)
                   .joins(:soldier).select(:first_name, :last_name, :nickname, :hits, :misses, :kills)
  end
end
