class Api::V1::TrainersController < ApplicationController
  before_action :set_trainer, only: %i[show update destroy]
  include AuthorizeRequest
  include AuthorizeAdmin

  # GET /trainers
  def index
    @trainers = Trainer.order(created_at: :desc)

    render json: @trainers
  end

  # GET /trainers/1
  def show
    render json: @trainer
  end

  # POST /trainers
  def create
    @trainer = Trainer.new(trainer_params)

    if @trainer.save
      render json: @trainer, status: :created, location: api_v1_trainer_url(@trainer)
    else
      render json: @trainer.errors, status: :unprocessable_entity

      puts @trainer.errors.full_messages
    end
  end

  # GET /trainer (returns info about the authenticated user)
  def me
    render json: {trainer: @current_trainer}
  end

  # PATCH/PUT /trainers/1
  def update
    if @trainer.update(trainer_params)
      render json: @trainer
    else
      render json: @trainer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /trainers/1
  def destroy
    @trainer.destroy
    render json: { message: 'Trainer successfully deleted' }, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Trainer not found' }, status: :not_found
  rescue StandardError => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_trainer
      @trainer = Trainer.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    private

    def trainer_params
      params.require(:trainer).permit(:name, :age, :username, :role, :password)
    end

end
