class Mission < ApplicationRecord
  belongs_to :user
  has_many :missions_soldiers

  validates_presence_of :name
end
