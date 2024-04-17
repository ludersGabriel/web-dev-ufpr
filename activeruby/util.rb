def help
  puts "\nComandos disponíveis:"
  puts "\tinsere tabela a=foo b=bar - insere um registro com atributos a = foo e b = bar na tabela 'tabela'"
  puts "\tremove tabela a=foo - remove um registro com atributo a = foo na tabela 'tabela'"
  puts "\taltera tabela a=foo b=bar - altera um registro com atributo a = foo para b = bar na tabela 'tabela'"
  puts "\tlista tabela - lista todos os registros da tabela 'tabela'"
  puts "\tcls - limpa a tela"
  puts "\ttabelas - exibe todas as tabelas disponíveis"
  puts "\tquit or exit - finaliza o programa"
  puts "\thelp - exibe essa mensagem\n"
end

def greeting
  puts 'Bem vindo!'
  help
end