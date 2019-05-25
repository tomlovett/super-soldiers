class MissionSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :soldiers, through: :missions_soldiers
end
