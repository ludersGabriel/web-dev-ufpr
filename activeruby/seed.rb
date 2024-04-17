require 'active_record'

require_relative 'trainer'
require_relative 'trainerProfile'
require_relative 'pokemon'
require_relative 'battle'
require_relative 'pokemonBattle'

require_relative 'schema'

setup_database

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

