class Soldier < ApplicationRecord
  belongs_to :user
  has_many :missions_soldiers

  validates_presence_of :first_name, :last_name, :nationality, :gender, :is_alive
end
