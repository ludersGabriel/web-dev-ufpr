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

20.times do
    Trainer.create(
        name: Faker::Name.name,
        age: rand(12..30),
        username: Faker::Internet.username,
        password: 'password',
    )
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
