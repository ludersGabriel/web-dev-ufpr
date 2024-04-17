require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"    

class Battle < ActiveRecord::Base
  has_many :pokemon_battle, dependent: :destroy
  has_many :pokemon, through: :pokemon_battle
end
