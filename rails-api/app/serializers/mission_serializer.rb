class MissionSerializer < ActiveModel::Serializer
  attributes :name

  has_many :soldiers
end
