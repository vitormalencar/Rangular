class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configurar_format
  respond_to :html, :json
  after_action :configurar_x_csrf_token
  after_action :configurar_user


  def home
  end

  private
  def configurar_format
    request.format = :json
  end

  def configurar_x_csrf_token
    headers['X-CSRF-Token'] = form_authenticity_token if protect_against_forgery?
  end
  def configurar_user
    headers['User'] = current_user.try(:to_json) || ""
  end
end
