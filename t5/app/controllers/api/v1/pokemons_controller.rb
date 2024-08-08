class Api::V1::PokemonsController < ApplicationController
  before_action :set_pokemon, only: %i[ show update destroy ]
  include AuthorizeRequest
  include AuthorizeAdmin

  # GET /pokemons
  def index
    @pokemons = Pokemon.all

    render json: @pokemons
  end

  # GET /pokemons/1
  def show
    render json: @pokemon
  end

  # GET /pokemons/by_trainer
  def index_by_trainer
    @trainers_with_pokemons = Pokemon.pokemons_by_trainer
    render json: @trainers_with_pokemons
  end

  # POST /pokemons
  def create
    @pokemon = Pokemon.new(pokemon_params)

    if @pokemon.save
      render json: @pokemon, status: :created, location: api_v1_pokemon_url(@pokemon)
    else
      render json: @pokemon.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pokemons/1
  def update
    if @pokemon.update(pokemon_params)
      render json: @pokemon
    else
      render json: @pokemon.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pokemons/1
  def destroy
    @pokemon.destroy
    render json: { message: 'Pokemon successfully deleted' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Pokemon not found' }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pokemon
      @pokemon = Pokemon.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pokemon_params
      params.require(:pokemon).permit(:name, :poke_type, :level, :trainer_id)
    end
end
