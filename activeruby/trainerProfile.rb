require 'active_record'
require_relative 'util'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

class TrainerProfile < ActiveRecord::Base
  belongs_to :trainer

  def self.create(arrInput)
    objInput = arrInputToHash(arrInput)

    requiredAtt = [:hometown, :favorite_pokemon, :trainer_id]
    missingAtt = requiredAtt.select { |attr| objInput[attr].nil? }

    if missingAtt.any?
      raise "Atributos faltando: #{missingAtt.join(', ')}"
    end

    super(objInput)

    puts 'Perfil de treinador inserido com sucesso!'
  end

  def self.list
    profiles = TrainerProfile.all

    puts "id  | hometown           | favorite_pokemon | trainer_id"
    puts "----|--------------------|------------------|-----------"
    profiles.each do |profile|
      hometown_display = profile.hometown.length > 15 ? profile.hometown[0...10] + '...' : profile.hometown
      favorite_display = profile.favorite_pokemon.length > 10 ? profile.favorite_pokemon[0...10] + '...' : profile.favorite_pokemon
      trainer_id_display = profile.trainer_id.to_s

      puts "#{profile.id.to_s.ljust(3)} | #{hometown_display.ljust(18)} | #{favorite_display.ljust(16)} | #{trainer_id_display.ljust(9)}"
    end
  end

  def self.remove(arrInput)
    if arrInput.empty?
      raise 'Nenhum registro informado para remoção'
    end

    objInput = arrInputToHash(arrInput)

    TrainerProfile.where(objInput).destroy_all

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

    TrainerProfile.where(identifier).update_all(objInput)

    puts 'Registro(s) alterado(s) com sucesso!'
  end

end
