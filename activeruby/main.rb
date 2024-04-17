require 'readline'
require_relative 'util'
require_relative 'trainer'
require_relative 'trainerProfile'
require_relative 'pokemon'
require_relative 'battle'
require_relative 'pokemonBattle'
require_relative 'schema'

setupDatabase

models = {
  trainers: Trainer,
  trainerProfiles: TrainerProfile,
  pokemons: Pokemon,
  battles: Battle,
  pokemonBattles: PokemonBattle
}

commands = {
  'insere' => lambda { |model, args| model.create(args) },
  'exclui' => lambda { |model, args| model.remove(args) },
  'altera' => lambda { |model, args| model.update(args) },
  'lista' => lambda { |model, args| model.list },
  'cls' => lambda { |model, args| system('clear') },
  'tabelas' => lambda { |model, args| puts models.keys.join(', ') },
  'help' => lambda { |model, args| greeting(models.keys) }
}

auxiliarCommands = ['help', 'cls', 'tabelas']

greeting(models.keys)

loop do

  input = Readline.readline("\n> ", true)
  Readline::HISTORY.pop if input.empty? || Readline::HISTORY.to_a[-2] == input

  if input.empty?
    next
  end

  split = parseInput(input)
  command = split[0]

  break if command == 'exit' || command == 'quit'

  begin
    if auxiliarCommands.include?(command)
      commands[command].call(nil, nil)
      next
    end

    if split.length < 2
      raise "Comando inválido ou incompleto. Utilize 'help' para ver os comandos disponíveis"
    end

    if commands.include?(command)
      tableName, *data = split[1..-1]
      model = models[tableName.to_sym]

      data = validateInput(data)

      raise "Tabela não encontrada" unless model

      commands[command].call(model, data)
    else
      puts 'Comando inválido. Utilize "help" para ver os comandos disponíveis'
    end
  rescue => e
    puts e.message
  end
end
