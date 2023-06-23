class Skill < ApplicationRecord
  has_and_belongs_to_many :soldiers

  validates :fighter_class, inclusion: { in: Soldier::ALL_FIGHTER_CLASSES }
end
