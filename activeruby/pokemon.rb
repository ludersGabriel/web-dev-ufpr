require 'active_record'
require_relative 'util'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

class Pokemon < ActiveRecord::Base
  belongs_to :trainer
  has_many :pokemon_battle, dependent: :destroy
  has_many :battles, through: :pokemon_battles

  def self.create(arrInput)
    objInput = arrInputToHash(arrInput)

    requiredAtt = [:name, :poke_type, :level, :trainer_id]
    missingAtt = requiredAtt.select { |attr| objInput[attr].nil? }

    if missingAtt.any?
      raise "Atributos faltando: #{missingAtt.join(', ')}"
    end

    super(objInput)

    puts 'Pokemon inserido com sucesso!'
  end

  def self.list
    pokemons = Pokemon.all

    puts "id  | name          | poke_type     | level | trainer_id"
    puts "----|---------------|---------------|-------|-----------"
    pokemons.each do |pokemon|
      name_display = pokemon.name.length > 10 ? pokemon.name[0...10] + '...' : pokemon.name
      type_display = pokemon.poke_type.length > 10 ? pokemon.poke_type[0...10] + '...' : pokemon.poke_type
      level_display = pokemon.level.to_s
      trainer_id_display = pokemon.trainer_id.to_s

      puts "#{pokemon.id.to_s.ljust(3)} | #{name_display.ljust(13)} | #{type_display.ljust(13)} | #{level_display.ljust(5)} | #{trainer_id_display.ljust(9)}"
    end
  end

  def self.remove(arrInput)
    if arrInput.empty?
      raise 'Nenhum registro informado para remoção'
    end

    objInput = arrInputToHash(arrInput)

    Pokemon.where(objInput).destroy_all

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

    Pokemon.where(identifier).update_all(objInput)

    puts 'Registro(s) alterado(s) com sucesso!'
  end
end
