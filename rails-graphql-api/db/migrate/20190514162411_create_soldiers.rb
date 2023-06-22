class CreateSoldiers < ActiveRecord::Migration[5.2]
  def change
    create_table :soldiers do |t|
      t.string :first_name
      t.string :last_name
      t.string :nationality
      t.string :gender
      t.boolean :is_alive

      t.timestamps
    end
  end
end
