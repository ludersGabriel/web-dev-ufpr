# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Trainer.destroy_all

trainers = [
  { username: 'ash', name: 'Ash', age: 10, password: 'password' },
  { username: 'misty',name: 'Misty', age: 12, password: 'password' },
  { username: 'brock', name: 'Brock', age: 15, password: 'password' },
  { username: 'gary', name: 'Gary', age: 10, password: 'password' },
  { username: 'jessie', name: 'Jessie', age: 20, password: 'password' },
  { username: 'james', name: 'James', age: 20, password: 'password' },
  { username: 'mewoth', name: 'Meowth', age: 20, password: 'password' },
  { username: 'butch', name: 'Butch', age: 20, password: 'password' },
  { username: 'cassidy', name: 'Cassidy', age: 20, password: 'password' },
  { username: 'ritchie', name: 'Ritchie', age: 10, password: 'password' },
  { username: 'may', name: 'May', age: 10, password: 'password' },
  { username: 'max', name: 'Max', age: 10, password: 'password' }
]

trainers.each do |trainer|
  puts(trainer)
  Trainer.create!(trainer)
end

profiles = [
  { hometown: 'Pallet Town', favorite_pokemon: 'Pikachu', trainer_id: 1 },
  { hometown: 'Cerulean City', favorite_pokemon: 'Starmie', trainer_id: 2 },
  { hometown: 'Pewter City', favorite_pokemon: 'Onix', trainer_id: 3 },
  { hometown: 'Pallet Town', favorite_pokemon: 'Eevee', trainer_id: 4 },
  { hometown: 'Unknown', favorite_pokemon: 'Arbok', trainer_id: 5 },
  { hometown: 'Unknown', favorite_pokemon: 'Weezing', trainer_id: 6 }
]

profiles.each do |profile|
  puts(profile)
  TrainerProfile.create!(profile)
end

Trainer.create(
    name: 'admin user',
    age: 30,
    username: 'admin',
    password: 'admin',
    role: 'admin',
)

Trainer.create(
    name: 'user user',
    age: 30,
    username: 'user',
    password: 'user',
)


# db/seeds.rb

pokemons = [
  { name: 'Pikachu', poke_type: 'Electric', level: 5, trainer_id: 1 },
  { name: 'Charmander', poke_type: 'Fire', level: 5, trainer_id: 1 },
  { name: 'Squirtle', poke_type: 'Water', level: 5, trainer_id: 2 },
  { name: 'Bulbasaur', poke_type: 'Grass', level: 5, trainer_id: 3 },
  { name: 'Vulpix', poke_type: 'Fire', level: 5, trainer_id: 4 },
  { name: 'Psyduck', poke_type: 'Water', level: 5, trainer_id: 5 },
  { name: 'Geodude', poke_type: 'Rock', level: 5, trainer_id: 6 },
  { name: 'Meowth', poke_type: 'Normal', level: 5, trainer_id: 7 },
  { name: 'Hitmonchan', poke_type: 'Fighting', level: 5, trainer_id: 8 }
]

pokemons.each do |pokemon|
  puts pokemon
  Pokemon.create!(pokemon)
end
