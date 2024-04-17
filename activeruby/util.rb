require 'shellwords'

def help(arrTables = [])
  puts "\nComandos disponíveis:"
  puts "\tinsere tabela a=foo b=bar - insere um registro com atributos a = foo e b = bar na tabela 'tabela'"
  puts "\tremove tabela a=foo - remove um registro com atributo a = foo na tabela 'tabela'"
  puts "\taltera tabela a=foo b=bar - altera um registro com atributo a = foo para b = bar na tabela 'tabela'"
  puts "\tlista tabela - lista todos os registros da tabela 'tabela'"
  puts "\tcls - limpa a tela"
  puts "\ttabelas - exibe todas as tabelas disponíveis"
  puts "\tquit or exit - finaliza o programa"
  puts "\thelp - exibe essa mensagem\n"
  puts "\nTabelas disponíveis: "
  arrTables.each do |table|
    puts "\t#{table}"
  end
  puts "\n"
end

def greeting(arrTables = [])
  puts 'Bem vindo!'
  help arrTables
end

def validateInput(arrInput)
  teste = arrInput.map do |attr|

    if attr.count('=') != 1
      raise 'Atributo inválido. Faltando = ou atributo duplicado'
    end

    key, value = attr.split('=')
    value ||= ''
    key ||= ''

    if key.empty? || value.empty?
      raise 'Atributo inválido. Chave ou valor vazio'
    end

    cleanedValue = value.strip.delete_prefix('"').delete_suffix('"')
    cleanedValue = cleanedValue.delete_prefix("'").delete_suffix("'")

    if cleanedValue.empty?
      raise 'Atributo inválido. Valor vazio'
    end

    "#{key}=#{cleanedValue}"
  end

  return teste
end


def parseInput(input)
  # Using Shellwords to split the input respecting quoted strings
  Shellwords.split(input)
rescue ArgumentError => e
  puts "Error parsing input: #{e.message}"
  []
end

def arrInputToHash(arrInput)
  obj = arrInput.each_with_object({}) do |attr, obj|
    key, value = attr.split('=')
    obj[key.to_sym] = value
  end

  return obj
end
