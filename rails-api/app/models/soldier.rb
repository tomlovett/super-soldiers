class Soldier < ApplicationRecord
  belongs_to :user
  has_many :missions_soldiers

  validates_presence_of :first_name, :last_name, :nationality, :gender
  validates_inclusion_of :is_alive, in: [true, false]
end
