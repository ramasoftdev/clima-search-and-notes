# frozen_string_literal: true

class Api::SessionsController < Devise::SessionsController
  respond_to :json, :html
  skip_before_action :verify_signed_out_user, only: [:destroy]
  skip_before_action :authenticate_user, only: [:create]
  
  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    # super
    # p "warden #{warden}"
    # p "request.headers #{request.headers["Content-Type"]}"
    # p "request.headers #{request.headers["Authorization"]}"
    resource = warden.authenticate!(:scope => :user)
    # p "resource -> #{resource.to_json}"
    if sign_in(:user, resource)
      render json: resource, status: :ok
    else
      render json: { error: 'Invalidad resource'}, status: :unauthorized
    end
  end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
  private
    def revoke_token(token)
      # Decode JWT to get jti and exp values.
      begin
        secret = Rails.application.credentials.jwt_secret
        jti = JWT.decode(token, secret, true, algorithm: 'HS256', verify_jti: true)[0]['jti']
        exp = JWT.decode(token, secret, true, algorithm: 'HS256')[0]['exp']
        user = User.find(JWT.decode(token, secret, true, algorithm: 'HS256')[0]['sub'])
        sign_out(user)
        # Add record to blacklist.
        time_now = Time.zone.now.to_s.split(" UTC")[0]
        sql_blacklist_jwt = "INSERT INTO jwt_blacklist (jti, exp, created_at, updated_at) VALUES ('#{ jti }', '#{ Time.at(exp) }', '#{time_now}', '#{time_now}');"
        ActiveRecord::Base.connection.execute(sql_blacklist_jwt)
      rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
        head :unauthorized
      end
    end

    def respond_with(resource, _opts = {})
      render json: resource
    end

    def respond_to_on_destroy
      token = request.headers['Authorization'].split("Bearer ")[1]
      revoke_token(token)
      request.delete_header('Authorization')
      render json: :ok
    end
end