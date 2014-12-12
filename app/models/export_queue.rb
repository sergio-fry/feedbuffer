require 'digest/sha1'
class ExportQueue < ActiveRecord::Base
  include SerializedItems

  after_commit :add_export_job

  def add_item_with_scheduling(attributes)
    attributes = attributes.clone
    attributes["scheduled_at"] = next_schedule_time items.last.try(:scheduled_at) || Time.now
    add_item_without_scheduling(attributes)
  end

  alias_method_chain :add_item, :scheduling

  def schedule!
    time = next_schedule_time Time.now
    self.next_scheduled_at = time

    items.each do |item|
      update_item item.id, { scheduled_at: time }
      time = next_schedule_time time
    end
  end

  def export!
    items.each do |item|
      if item.scheduled_at.past?
        export_history.unshift_item item.to_h.stringify_keys.merge("published_at" => Time.now)
        delete_item item.id
      end
    end

    transaction do
      save!
      export_history.save!
    end
  end

  def export_history
    @export_history ||= ExportHistory.first || ExportHistory.create
  end

  def next_schedule_time(time)
    t = time
    next_time = nil

    while true do
      if allowed_day? t
        times.each do |allowed_time|
          next_time = t.beginning_of_day + allowed_time

          return next_time if next_time > time
        end
      end

      t = t + 1.day
    end
  end

  private

  def add_export_job
    Exporter.perform_at(next_scheduled_at, id) if items.present?
  end

  def times
    [8.hours + 30.minutes, 12.hours, 19.hours + 45.minutes, 23.hours + 1.minute]
  end

  def week_days
    [1, 3, 4, 5]
  end

  def allowed_day?(time)
    week_days.include?(time.wday)
  end
end
