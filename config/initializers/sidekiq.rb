ENV['REDIS_PROVIDER'] ||= "redis://localhost:6379"

Sidekiq.configure_server do |config|
  config.redis = { :url => ENV['REDIS_PROVIDER'], :namespace => 'feed-buffer' }
end 

Sidekiq.configure_client do |config|
  config.redis = { :url => ENV['REDIS_PROVIDER'], :namespace => 'feed-buffer' }
end
