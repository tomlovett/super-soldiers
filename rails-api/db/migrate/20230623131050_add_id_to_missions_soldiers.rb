class AddIdToMissionsSoldiers < ActiveRecord::Migration[6.1]
  def change
    add_column(:missions_soldiers, :id, :primary_key, null: false)
  end
end
