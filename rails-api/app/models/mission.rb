class Mission < ApplicationRecord
  belongs_to :user
  has_many :missions_soldiers

  validates_presence_of :name

  def with_mission_performances
    missions_soldiers = MissionsSoldier.where(mission: self)

    attributes.merge({ performances: missions_soldiers }).to_h
  end
end
