require 'active_record'
require_relative 'util'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

class PokemonBattle < ActiveRecord::Base
  belongs_to :pokemon
  belongs_to :battle

  def self.create(arrInput)
    objInput = arrInputToHash(arrInput)

    requiredAtt = [:pokemon_id, :battle_id]
    missingAtt = requiredAtt.select { |attr| objInput[attr].nil? }

    if missingAtt.any?
      raise "Atributos faltando: #{missingAtt.join(', ')}"
    end

    super(objInput)

    puts 'Pokemon inserido na batalha com sucesso!'
  end

  def self.list
    pbs = PokemonBattle.all

    puts "id  | pokemon_id | battle_id"
    puts "----|------------|----------"
    pbs.each do |pb|
      puts "#{pb.id.to_s.ljust(3)} | #{pb.pokemon_id.to_s.ljust(10)} | #{pb.battle_id.to_s.ljust(8)}"
    end
  end

  def self.remove(arrInput)
    if arrInput.empty?
      raise 'Nenhum registro informado para remoção'
    end

    objInput = arrInputToHash(arrInput)

    PokemonBattle.where(objInput).destroy_all

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
    key, value = arraInput[0].split('=')
    identifier[key.to_sym] = value

    objInput = arrInputToHash(arrInput[1..-1])

    PokemonBattle.where(identifier).update_all(objInput)

    puts 'Registro(s) atualizado(s) com sucesso!'
  end

end
