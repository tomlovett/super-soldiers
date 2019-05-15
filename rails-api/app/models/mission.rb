class Mission < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :soldiers

  validates_presence_of :name
end
