class CreateTrainerProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :trainer_profiles do |t|
      t.string :hometown
      t.string :favorite_pokemon
      t.integer :trainer_id

      t.timestamps
    end
    add_foreign_key :trainer_profiles, :trainers, column: :trainer_id, on_delete: :cascade, on_update: :cascade
    add_index :trainer_profiles, :trainer_id, unique: true
  end
end
