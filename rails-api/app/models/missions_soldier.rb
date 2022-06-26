class MissionsSoldier < ApplicationRecord
	belongs_to :mission
	belongs_to :soldier

	validates_presence_of :hits, :misses, :kills, :was_promoted, :was_KIA
end
