class MissionsSoldier < ApplicationRecord
	belongs_to :mission
	belongs_to :soldier

	validates_presence_of :hits, :misses, :kills
	validates_inclusion_of :was_promoted, :was_KIA, in: [true, false]
end
