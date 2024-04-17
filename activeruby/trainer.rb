require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "Tabelas.sqlite3"

class Trainer < ActiveRecord::Base
  has_one :trainer_profile, :dependent => :destroy, required: false
  has_many :pokemon, :dependent => :destroy

  def self.create(arrInput)

    objInput = arrInput.each_with_object({}) do |attr, obj|
      key, value = attr.split('=')
      obj[key.to_sym] = value
    end

    requiredAtt = [:name, :age]
    missingAtt = requiredAtt.select { |attr| objInput[attr].nil? }

    if missingAtt.any?
      raise "Atributos faltando: #{missingAtt.join(', ')}"
    end

    super(objInput)

    puts 'Treinador inserido com sucesso!'
  end

  def self.list
    trainers = Trainer.all
  
    puts "id  | name          | age"
    trainers.each do |trainer|
      name_display = trainer.name.length > 10 ? trainer.name[0...10] + '...' : trainer.name
      age_display = trainer.age.to_s
    
      puts "#{trainer.id.to_s.ljust(3)} | #{name_display.ljust(13)} | #{age_display.ljust(3)}"
    end
  end
  

  def self.remove(arrInput)

    if arrInput.empty?
      raise 'Nenhum registro informado para remoção'
    end

    objInput = arrInput.each_with_object({}) do |attr, obj|
      key, value = attr.split('=')
      obj[key.to_sym] = value
    end

    Trainer.where(objInput).destroy_all

    puts 'Registro(s) removido com sucesso!'
  end

  def self.update(arrInput)
      
    if arrInput.empty?
      raise 'Nenhum registro informado para alteração'
    end

    if arrInput.length == 1
      raise 'Nenhum atributo informado para alteração'
    end

    identifier = arrInput[0]

    objInput = arrInput[1..-1].each_with_object({}) do |attr, obj|
      key, value = attr.split('=')
      obj[key.to_sym] = value
    end

    Trainer.where(identifier).update_all(objInput)

    puts 'Registro(s) alterado com sucesso!'
  end
  
end