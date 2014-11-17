class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :set_default_response_format_to_json
  respond_to :html,:json
  after_filter :set_csrf_cookie_for_ng


  private
  def set_default_response_format_to_json
  	p request.headers[X-CSRF-TOKEN]
  	request.format = :json
  end

  def set_csrf_cookie_for_ng

  	cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

end
