class AddNicknameToSoldiers < ActiveRecord::Migration[5.2]
  def change
    add_column :soldiers, :nickname, :string
  end
end
