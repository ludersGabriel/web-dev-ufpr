class Api::V1::BattlesController < ApplicationController
  before_action :set_battle, only: %i[ show update destroy ]
  include AuthorizeRequest
  include AuthorizeAdmin

  # GET /battles
  def index
    @battles = Battle.all

    render json: @battles
  end

  # GET /battles/1
  def show
    render json: @battle
  end

  # GET /battles/with_pokemons
  def index_with_pokemons
    @battles = Battle.with_pokemons
    render json: @battles
  end

  # POST /battles
  def create
    @battle = Battle.new(battle_params)

    if @battle.save
      render json: @battle, status: :created, location: api_v1_battle_url(@battle)
    else
      render json: @battle.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /battles/1
  def update
    if @battle.update(battle_params)
      render json: @battle
    else
      render json: @battle.errors, status: :unprocessable_entity
    end
  end

  # DELETE /battles/1
  def destroy
    @battle.destroy
    render json: { message: 'Battle successfully deleted' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Battle not found' }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_battle
      @battle = Battle.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def battle_params
      params.require(:battle).permit(:location)
    end
end
