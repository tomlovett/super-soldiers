class SoldierSerializer < ActiveModel::Serializer
  attributes  :id,
              :user_id,
              :first_name,
              :last_name,
              :nickname,
              :gender,
              :nationality,
              :is_alive,
              :mission_ids,
              :exp,
              :fighter_class

  def mission_ids
    MissionsSoldier.where(soldier_id: object.id).pluck(:id)
  end
end
