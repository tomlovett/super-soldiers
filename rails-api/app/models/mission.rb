class Mission < ApplicationRecord
  belongs_to :user
  has_many :performances

  validates_presence_of :name

  def with_performances
    performances = Performance.where(mission: self)

    attributes.merge({ performances: performances }).to_h
  end
end
