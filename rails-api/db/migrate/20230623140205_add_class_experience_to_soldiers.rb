class AddClassExperienceToSoldiers < ActiveRecord::Migration[6.1]
  def change
    add_column :soldiers, :fighter_class, :string
    add_column :soldiers, :exp, :int, null: false, default: 0

    add_column :missions_soldiers, :exp_gained, :int, null: false, default: 0
  end
end
