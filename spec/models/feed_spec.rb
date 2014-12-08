require 'rails_helper'

RSpec.describe Feed, :type => :model do
  before do
    @feed = Feed.new
  end

  describe "#url=" do
    it "should strip spaces" do
      @feed.url = " http://foo.bar/ "
      expect(@feed.url).to eq("http://foo.bar/")
    end

    it "should add missing http://" do
      @feed.url = "foo.bar"
      expect(@feed.url).to eq("http://foo.bar")
    end

    it "should not replace https" do
      @feed.url = "https://foo.bar"
      expect(@feed.url).to eq("https://foo.bar")
    end
  end
end
