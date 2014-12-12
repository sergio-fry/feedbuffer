# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment',  __FILE__)
require 'sidekiq/web'

Sidekiq::Web.use(Rack::Auth::Basic) do |user, password|
  [user, password] == ["admin", ENV['SIDEKIQ_WEB_PASSWORD'] || "secret"]
end

run Rack::URLMap.new('/' => Rails.application, '/sidekiq' => Sidekiq::Web)
