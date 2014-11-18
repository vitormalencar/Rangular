class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :configurar_format
  respond_to :html, :json
  after_action :configurar_x_csrf_token

  private
  def configurar_format
  	request.format = :json
  end

  def configurar_x_csrf_token
    headers['X-CSRF-Token'] = form_authenticity_token if protect_against_forgery?
  end
end
