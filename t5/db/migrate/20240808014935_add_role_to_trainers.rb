class AddRoleToTrainers < ActiveRecord::Migration[7.1]
  def change
    add_column :trainers, :role, :string, default: "user", null: false
  end
end
