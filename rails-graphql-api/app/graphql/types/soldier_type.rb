# frozen_string_literal: true

module Types
  class SoldierType < Types::BaseObject
    field :id, ID, null: false
    field :first_name, String
    field :last_name, String
    field :nationality, String
    field :gender, String
    field :is_alive, Boolean
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :user_id, Integer
    field :nickname, String
  end

	def mission_ids
		object.missions.ids
	end
end
