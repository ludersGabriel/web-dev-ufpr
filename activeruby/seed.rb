require 'active_record'

require_relative 'trainer'
require_relative 'trainerProfile'
require_relative 'pokemon'
require_relative 'battle'
require_relative 'pokemonBattle'

require_relative 'schema'

cleanDatabase
setupDatabase

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

trainers = [
  ['name=Ash', 'age=10'],
  ['name=Misty', 'age=12'],
  ['name=Brock', 'age=15'],
  ['name=Gary', 'age=10'],
  ['name=Jessie', 'age=20'],
  ['name=James', 'age=20'],
  ['name=Meowth', 'age=20'],
  ['name=Butch', 'age=20'],
  ['name=Cassidy', 'age=20'],
  ['name=Ritchie', 'age=10'],
  ['name=May', 'age=10'],
  ['name=Max', 'age=10']
]

trainers.each do |trainer|
  Trainer.create(trainer)
end

profiles = [
  ['hometown=Pallet Town', 'favorite_pokemon=Pikachu', 'trainer_id=1'],
  ['hometown=Cerulean City', 'favorite_pokemon=Starmie', 'trainer_id=2'],
  ['hometown=Pewter City', 'favorite_pokemon=Onix', 'trainer_id=3'],
  ['hometown=Pallet Town', 'favorite_pokemon=Eevee', 'trainer_id=4'],
  ['hometown=Unknown', 'favorite_pokemon=Arbok', 'trainer_id=5'],
  ['hometown=Unknown', 'favorite_pokemon=Weezing', 'trainer_id=6'],
]

profiles.each do |profile|
  TrainerProfile.create(profile)
end

pokemons = [
  ['name=Pikachu', 'poke_type=Electric', 'level=5', 'trainer_id=1'],
  ['name=Charmander', 'poke_type=Fire', 'level=5', 'trainer_id=1'],
  ['name=Squirtle', 'poke_type=Water', 'level=5', 'trainer_id=2'],
  ['name=Bulbasaur', 'poke_type=Grass', 'level=5', 'trainer_id=3'],
  ['name=Vulpix', 'poke_type=Fire', 'level=5', 'trainer_id=4'],
  ['name=Psyduck', 'poke_type=Water', 'level=5', 'trainer_id=5'],
  ['name=Geodude', 'poke_type=Rock', 'level=5', 'trainer_id=6'],
  ['name=Meowth', 'poke_type=Normal', 'level=5', 'trainer_id=7'],
  ['name=Hitmonchan', 'poke_type=Fighting', 'level=5', 'trainer_id=8'],
]

pokemons.each do |pokemon|
  Pokemon.create(pokemon)
end

battles = [
  ['location=Viridian City'],
  ['location=Pewter City'],
  ['location=Cerulean City'],
  ['location=Vermilion City'],
  ['location=Lavender Town'],
]

battles.each do |battle|
  Battle.create(battle)
end

pokemon_battles = [
  ['pokemon_id=1', 'battle_id=1'],
  ['pokemon_id=2', 'battle_id=1'],
  ['pokemon_id=3', 'battle_id=2'],
]

pokemon_battles.each do |pokemon_battle|
  PokemonBattle.create(pokemon_battle)
end
