class Exporter
 include Sidekiq::Worker

  def perform(export_queue_id)
    @queue = ExportQueue.find export_queue_id
    @queue.export!
  end
end
