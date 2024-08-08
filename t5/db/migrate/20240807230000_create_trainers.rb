class CreateTrainers < ActiveRecord::Migration[7.1]
  def change
    create_table :trainers do |t|
      t.string :name
      t.integer :age
      t.string :username
      t.string :password_digest

      t.timestamps
    end
  end
end
