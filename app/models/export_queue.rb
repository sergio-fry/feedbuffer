require 'digest/sha1'
class ExportQueue < ActiveRecord::Base
  include SerializedItems

  def schedule!
    time = 1.hour.from_now
    self.next_scheduled_at = time

    items.each do |item|
      update_item item.id, { scheduled_at: time }
      time += 1.hour
    end
  end

  def export!
    items.each do |item|
      if item.scheduled_at.past?
        export_history.add_item item.to_h.stringify_keys
        delete_item item.id
      end
    end
  end

  def export_history
    @export_history ||= ExportHistory.first || ExportHistory.create
  end
end
