class Feed < ActiveRecord::Base
  def title
    URI(url).host rescue "Feed ##{id}"
  end
end
