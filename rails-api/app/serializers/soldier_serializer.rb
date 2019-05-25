class SoldierSerializer < ActiveModel::Serializer
  attributes  :id,
              :user_id,
              :first_name,
              :last_name,
              :gender,
              :nationality,
              :is_alive,
              :mission_ids

  def mission_ids
    object.missions.ids
  end
end
