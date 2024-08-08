module AuthorizeAdmin
  extend ActiveSupport::Concern

  included do
    before_action :authorize_admin, only: %i[create update destroy]
  end

  private

  def authorize_admin
    unless @current_trainer&.admin?
      render json: { error: 'Unauthorized action' }, status: :forbidden
    end
  end
end
