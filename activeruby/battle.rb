require 'active_record'
require_relative 'util'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

class Battle < ActiveRecord::Base
  has_many :pokemon_battle, dependent: :destroy
  has_many :pokemon, through: :pokemon_battle

  def self.create(arrInput)
    objInput = arrInputToHash(arrInput)

    requiredAtt = [:location]
    missingAtt = requiredAtt.select { |attr| objInput[attr].nil? }

    if missingAtt.any?
      raise "Atributos faltando: #{missingAtt.join(', ')}"
    end

    super(objInput)

    puts 'Batalha inserida com sucesso!'
  end

  def self.list
    battles = Battle.all

    puts "id  | location"
    puts "----|--------------------"
    battles.each do |battle|
      location_display = battle.location.length > 20 ? battle.location[0...10] + '...' : battle.location

      puts "#{battle.id.to_s.ljust(3)} | #{location_display.ljust(23)}"
    end
  end

  def self.remove(arrInput)
    if arrInput.empty?
      raise 'Nenhum registro informado para remoção'
    end

    objInput = arrInputToHash(arrInput)

    Battle.where(objInput).destroy_all

    puts 'Registro(s) removido com sucesso!'
  end

  def self.update(arrInput)
    if arrInput.empty?
      raise 'Nenhum registro informado para alteração'
    end

    if arrInput.length == 1
      raise 'Nenhum atributo informado para alteração'
    end

    identifier = {}
    key, value = arrInput[0].split('=')
    identifier[key.to_sym] = value

    objInput = arrInputToHash(arrInput[1..-1])

    Battle.where(identifier).update_all(objInput)

    puts 'Registro(s) alterado(s) com sucesso!'
  end

end
