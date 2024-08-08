class Battle < ApplicationRecord
  has_many :pokemon_battle, dependent: :destroy
  has_many :pokemon, through: :pokemon_battle

  validates :location, presence: true

  def self.with_pokemons
    Battle.includes(pokemon_battle: :pokemon).all.as_json(include: { pokemon_battle: { include: :pokemon } })
  end

end
