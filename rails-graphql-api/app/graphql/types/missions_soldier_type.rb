# frozen_string_literal: true

module Types
  class MissionsSoldierType < Types::BaseObject
    field :mission_id, Integer, null: false
    field :soldier_id, Integer, null: false
    field :hits, Integer
    field :misses, Integer
    field :kills, Integer
    field :was_promoted, Boolean
    field :was_KIA, Boolean
  end
end
