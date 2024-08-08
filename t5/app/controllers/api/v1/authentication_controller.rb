# app/controllers/api/v1/authentication_controller.rb

class Api::V1::AuthenticationController < ApplicationController
  def login
    @trainer = Trainer.find_by(username: params[:username])
    if @trainer&.authenticate(params[:password])
      token = JsonWebToken.encode(trainer_id: @trainer.id)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Invalid username or password' }, status: :unauthorized
    end
  end
end
