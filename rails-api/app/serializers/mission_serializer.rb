class MissionSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id

  has_many :soldiers, through: :missions_soldiers
end
