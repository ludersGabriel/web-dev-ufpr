
# Database Setup

## Tabelas

trainers, trainer_profiles, pokemons, battle, pokemon_battles

## Relations

- trainers 1 - 1 trainer_profiles
- trainers 1 - n pokemons
- pokemons n - n battle -> represented by pokemon_battles

# Running

## Init

initialize and seed the sqlite3 db with

```
ruby seed.rb
```

## Exec

to run the command line, do:

```
ruby main.rb
```

## Commands 

use `help` to see list of all available commands, but it has all the commands in the specification (lista, insere, altera and exclui) plus a few others related to the cli