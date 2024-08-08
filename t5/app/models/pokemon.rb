class Pokemon < ApplicationRecord
  belongs_to :trainer
  has_many :pokemon_battle, dependent: :destroy
  has_many :battle, through: :pokemon_battle

  validates :name, presence: true
  validates :poke_type, presence: true
  validates :level, presence: true
  validates :trainer_id, presence: true

  def self.pokemons_by_trainer
    Trainer.includes(:pokemon).all.as_json(include: :pokemon)
  end
end
