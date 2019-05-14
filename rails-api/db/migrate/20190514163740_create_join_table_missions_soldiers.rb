class CreateJoinTableMissionsSoldiers < ActiveRecord::Migration[5.2]
  def change
    create_join_table :missions, :soldiers do |t|
      # t.index [:mission_id, :soldier_id]
      # t.index [:soldier_id, :mission_id]
    end
  end
end
