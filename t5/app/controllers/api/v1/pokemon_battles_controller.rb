class Api::V1::PokemonBattlesController < ApplicationController
  before_action :set_pokemon_battle, only: %i[ show update destroy ]
  include AuthorizeRequest
  include AuthorizeAdmin

  # GET /pokemon_battles
  def index
    @pokemon_battles = PokemonBattle.all

    render json: @pokemon_battles
  end

  # GET /pokemon_battles/1
  def show
    render json: @pokemon_battle
  end

  # POST /pokemon_battles
  def create
    @pokemon_battle = PokemonBattle.new(pokemon_battle_params)

    if @pokemon_battle.save
      render json: @pokemon_battle, status: :created, location: api_v1_pokemon_battle_url(@pokemon_battle)
    else
      render json: @pokemon_battle.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pokemon_battles/1
  def update
    if @pokemon_battle.update(pokemon_battle_params)
      render json: @pokemon_battle
    else
      render json: @pokemon_battle.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pokemon_battles/1
  def destroy
    @pokemon_battle.destroy
    render json: { message: 'Pokemon battle successfully deleted' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Pokemon battle not found' }, status: :not_found
  rescue StandardError => e
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pokemon_battle
      @pokemon_battle = PokemonBattle.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def pokemon_battle_params
      params.require(:pokemon_battle).permit(:pokemon_id, :battle_id)
    end
end
