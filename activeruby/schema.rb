# db_setup.rb

require 'rubygems'
require 'active_record'

def setup_database
  db_path = "Tabelas.sqlite3"

  unless File.exist?(db_path)
    ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: db_path)

    ActiveRecord::Base.connection.create_table :trainers do |t|
      t.string :name
      t.integer :age
    end

    ActiveRecord::Base.connection.create_table :trainer_profiles do |t|
      t.integer :trainer_id
      t.string :hometown
      t.string :favorite_pokemon
    end

    ActiveRecord::Base.connection.create_table :pokemons do |t|
      t.string :name
      t.string :type
      t.integer :level
      t.integer :trainer_id
    end

    ActiveRecord::Base.connection.create_table :battles do |t|
      t.string :location
    end

    ActiveRecord::Base.connection.create_table :pokemon_battles do |t|
      t.integer :pokemon_id
      t.integer :battle_id
    end

    puts "Database and tables created successfully."
  else
    ActiveRecord::Base.establish_connection(adapter: "sqlite3", database: db_path)
    puts "Database already exists. Connection established."
  end
end
