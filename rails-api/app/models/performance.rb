class Performance < ApplicationRecord
  belongs_to :mission
  belongs_to :soldier

  validates_presence_of :hits, :misses, :kills

  def accuracy
    (100 * hits / (hits + misses)).round
  end
end
