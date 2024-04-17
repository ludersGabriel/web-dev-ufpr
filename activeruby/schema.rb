# db_setup.rb

require 'rubygems'
require 'active_record'

def setupDatabase
  db_path = "Tabelas.sqlite3"

  unless File.exist?(db_path)
    ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: db_path)

    ActiveRecord::Base.connection.create_table :trainers do |t|
      t.string :name
      t.integer :age
    end

    ActiveRecord::Base.connection.create_table :trainer_profiles do |t|
      t.string :hometown
      t.string :favorite_pokemon
      t.integer :trainer_id
      t.foreign_key :trainers, column: :trainer_id, on_delete: :cascade, on_update: :cascade
      t.index :trainer_id, unique: true
    end

    ActiveRecord::Base.connection.create_table :pokemons do |t|
      t.string :name
      t.string :poke_type
      t.integer :level
      t.integer :trainer_id
      t.foreign_key :trainers, column: :trainer_id, on_delete: :cascade, on_update: :cascade
    end

    ActiveRecord::Base.connection.create_table :battles do |t|
      t.string :location
    end

    ActiveRecord::Base.connection.create_table :pokemon_battles do |t|
      t.integer :pokemon_id
      t.integer :battle_id
      t.foreign_key :pokemons, column: :pokemon_id, on_delete: :cascade, on_update: :cascade
      t.foreign_key :battles, column: :battle_id, on_delete: :cascade, on_update: :cascade
    end

    puts "Database and tables created successfully."
  else
    ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: db_path)
    puts "Database already exists. Connection established."
  end
end

def cleanDatabase
  db_path = "Tabelas.sqlite3"

  if File.exist?(db_path)
    File.delete(db_path)
  end

  if File.exist?(db_path + "-shm")
    File.delete(db_path + "-shm")
  end

  if File.exist?(db_path + "-wal")
    File.delete(db_path + "-wal")
  end

  puts "All clear"
end
