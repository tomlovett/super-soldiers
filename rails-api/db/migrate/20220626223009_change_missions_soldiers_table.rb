class ChangeMissionsSoldiersTable < ActiveRecord::Migration[6.1]
	change_table :missions_soldiers do |t|
		t.integer :hits
		t.integer :misses
		t.integer :kills

		t.boolean :was_promoted
		t.boolean :was_KIA
	end
end
