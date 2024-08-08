class PokemonBattle < ApplicationRecord
  belongs_to :pokemon
  belongs_to :battle

  validates :pokemon_id, presence: true
  validates :battle_id, presence: true
end
