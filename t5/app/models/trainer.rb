class Trainer < ApplicationRecord
  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :name, presence: true
  validates :age, presence: true, numericality: { only_integer: true }
  validates :role, presence: true

  def as_json(options = {})
    super(options.merge({ except: [:password_digest] }))
  end

  def admin?
    role == 'admin'
  end

  def user?
    role == 'user'
  end
end
