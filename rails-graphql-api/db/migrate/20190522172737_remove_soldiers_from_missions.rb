class RemoveSoldiersFromMissions < ActiveRecord::Migration[5.2]
  def change
    remove_reference :missions, :soldiers, foreign_key: true
  end
end
