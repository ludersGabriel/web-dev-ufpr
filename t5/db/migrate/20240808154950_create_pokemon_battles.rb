class CreatePokemonBattles < ActiveRecord::Migration[7.1]
  def change
    create_table :pokemon_battles do |t|
      t.integer :pokemon_id
      t.integer :battle_id

      t.timestamps
    end

    add_foreign_key :pokemon_battles, :pokemons, column: :pokemon_id, on_delete: :cascade, on_update: :cascade
    add_foreign_key :pokemon_battles, :battles, column: :battle_id, on_delete: :cascade, on_update: :cascade
    add_index :pokemon_battles, :pokemon_id
    add_index :pokemon_battles, :battle_id
  end
end
