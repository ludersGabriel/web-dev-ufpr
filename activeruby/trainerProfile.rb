require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

class TrainerProfile < ActiveRecord::Base
  belongs_to :trainer
end