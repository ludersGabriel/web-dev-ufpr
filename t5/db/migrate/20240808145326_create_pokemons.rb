class CreatePokemons < ActiveRecord::Migration[7.1]
  def change
    create_table :pokemons do |t|
      t.string :name
      t.string :poke_type
      t.integer :level
      t.integer :trainer_id

      t.timestamps
    end
    add_foreign_key :pokemons, :trainers, column: :trainer_id, on_delete: :cascade, on_update: :cascade
  end
end
