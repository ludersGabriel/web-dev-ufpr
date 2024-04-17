require_relative 'util'
require_relative 'trainer'
require_relative 'trainerProfile'
require_relative 'pokemon'
require_relative 'battle'
require_relative 'pokemonBattle'
require_relative 'schema'

setup_database

models = {
  trainer: Trainer,
  trainerProfile: TrainerProfile,
  pokemon: Pokemon,
  battle: Battle,
  pokemonBattle: PokemonBattle
}

commands = {
  'insere' => lambda { |model, args| model.create(args) },
  'remove' => lambda { |model, args| model.remove(args) },
  'altera' => lambda { |model, args| model.update(args) },
  'lista' => lambda { |model, args| model.list },
  'cls' => lambda { |model, args| system('clear') },
  'tabelas' => lambda { |model, args| puts models.keys.join(', ') },
  'help' => lambda { |model, args| greeting}
}

auxiliarCommands = ['help', 'cls', 'tabelas']

greeting

loop do

  print "\n> "
  input = gets.chomp
  split = input.split(' ')
  command = split[0]

  break if command == 'exit' || command == 'quit'

  begin
    if split.length < 2
      raise "Comando inválido ou incompleto. Utilize 'help' para ver os comandos disponíveis"
    end
    
    if commands.include?(command)
      tableName, *data = split[1..-1]
      model = models[tableName.to_sym]

      raise "Tabela não encontrada" unless model || auxiliarCommands.include?(command)

      commands[command].call(model, data)
    else
      puts 'Comando inválido. Utilize "help" para ver os comandos disponíveis'
    end
  rescue => e
    puts e.message
  end
end