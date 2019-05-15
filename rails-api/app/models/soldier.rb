class Soldier < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :missions

  validates_presence_of :first_name, :last_name, :nationality, :gender, :is_alive
end
