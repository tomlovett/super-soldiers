class CreateSkills < ActiveRecord::Migration[6.1]
  def change
    create_table :skills do |t|
      t.string :name
      t.text :desc
      t.string :fighter_class
      t.integer :level

      t.timestamps
    end

    create_join_table :soldiers, :skills do |t|
      t.index :soldier_id
    end
  end
end
