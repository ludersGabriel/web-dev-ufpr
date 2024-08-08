class Api::V1::TrainerProfilesController < ApplicationController
  before_action :set_trainer_profile, only: %i[ show update destroy ]
  include AuthorizeRequest
  include AuthorizeAdmin

  # GET /trainer_profiles
  def index
    @trainer_profiles = TrainerProfile.all

    render json: @trainer_profiles
  end

  # GET /trainer_profiles/1
  def show
    render json: @trainer_profile
  end

  # GET /trainer_profiles/by_trainer
  def show_by_trainer
    @trainer_profile = TrainerProfile.find_by(trainer_id: @current_trainer.id)
    if @trainer_profile
      render json: @trainer_profile
    else
      render json: { error: 'Trainer profile not found' }, status: :not_found
    end
  end

  # POST /trainer_profiles
  def create
    @trainer_profile = TrainerProfile.new(trainer_profile_params)

    if @trainer_profile.save
      render json: @trainer_profile, status: :created, location: @trainer_profile
    else
      render json: @trainer_profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /trainer_profiles/1
  def update
    if @trainer_profile.update(trainer_profile_params)
      render json: @trainer_profile
    else
      render json: @trainer_profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trainer_profiles/1
  def destroy
    @trainer_profile.destroy
    render json: { message: 'Trainer profile successfully deleted' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Trainer profile not found' }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trainer_profile
      @trainer_profile = TrainerProfile.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def trainer_profile_params
      params.require(:trainer_profile).permit(:hometown, :favorite_pokemon, :trainer_id)
    end
end
