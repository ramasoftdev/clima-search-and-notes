class User < ApplicationRecord
  #Associations
  has_many :notes
  has_many :searches

  # Include default devise modules. Others available are:
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :registerable, :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  
  attr_writer :login
  
  # Only allow letter, number, underscore and punctuation.
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  validate :validate_username
  
  def validate_username
    if User.where(email: username).exists?
      errors.add(:username, :invalid)
    end
  end

  def jwt_payload
    super
  end

  # You can log the dispatch here if need be
  def on_jwt_dispatch(_token, _payload)
    "Bearer #{_token}"
  end

  protected

  def login=(login)
    @login = login
  end

  def login
    @login || self.username || self.email
  end

  private

  def self.find_for_database_authentication(warden_conditions)
      conditions = warden_conditions.dup
      if login = conditions.delete(:login)
         where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
      else
         where(conditions.to_h).first
      end
  end

end
