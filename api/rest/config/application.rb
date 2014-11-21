require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Rest
	class Application < Rails::Application
		config.middleware.insert_before 0, Rack::Cors do
			allow do
				origins 'localhost:9000'
				resource '*', :headers => :any, :methods => [:get, :post,:delete, :put], expose: 'X-CSRF-Token', credentials: true
			end
		end
	end
end
