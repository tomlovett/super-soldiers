class AddUserIdToMissionsSoldiers < ActiveRecord::Migration[5.2]
  def change
    add_column :missions, :user_id, :integer
    add_column :soldiers, :user_id, :integer
  end
end
