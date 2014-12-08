class Feed < ActiveRecord::Base
  def title
    URI(url).host.remove(/^www\./) rescue "Лента ##{id}"
  end

  def url=(value)
    v = value.strip
    v = v.match(/^https?:\/\//) ? v : "http://#{v}"
    self[:url] = v
  end
end
