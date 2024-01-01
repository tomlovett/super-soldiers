class RenameMissionsSoldiersToPerformances < ActiveRecord::Migration[6.1]
  def change
    rename_table :missions_soldiers, :performances
  end
end
