require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

class PokemonBattle < ActiveRecord::Base
  belongs_to :pokemon
  belongs_to :battle
end