require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

class Pokemon < ActiveRecord::Base
  belongs_to :trainer
  has_many :pokemon_battle, dependent: :destroy
  has_many :battles, through: :pokemon_battles
end
