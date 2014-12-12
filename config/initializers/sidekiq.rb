Sidekiq.configure_server do |config|
  config.redis = { host: 'localhost', db: "feed-buffer" }
end

Sidekiq.configure_client do |config|
  config.redis = { host: 'localhost', db: "feed-buffer" }
end
