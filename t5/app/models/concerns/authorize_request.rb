module AuthorizeRequest
  extend ActiveSupport::Concern

  included do
    before_action :authorize_request
  end

  private

  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    if header.nil?
      render json: { errors: 'Unauthorized access' }, status: :unauthorized and return
    end

    begin
      @decoded = JsonWebToken.decode(header)
      @current_trainer = Trainer.find(@decoded[:trainer_id])
    rescue ActiveRecord::RecordNotFound => e
      render json: { errors: e.message }, status: :unauthorized
    rescue JWT::DecodeError => e
      render json: { errors: 'Invalid token' }, status: :unauthorized
    end
  end
end
