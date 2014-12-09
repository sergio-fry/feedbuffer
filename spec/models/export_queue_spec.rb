require 'rails_helper'

RSpec.describe ExportQueue, :type => :model do
  before do
    @queue = ExportQueue.new
  end

  describe "items" do
    it "should be empty for a new queue" do
      expect(ExportQueue.new.items).to be_empty
    end
  end

  describe "#add_item" do
    it "should add item to queue" do
      expect do
        @queue.add_item(title: "Foo")
      end.to change{ @queue.items.size }.by(1)
    end

    it "should set item title" do
      @queue.add_item(title: "Foo")
      expect(@queue.items.last.title).to eq("Foo")
    end

    it "should set item url" do
      @queue.add_item(url: "http://foo.com/page-123")
      expect(@queue.items.last.url).to eq("http://foo.com/page-123")
    end

    it "should set item id" do
      @queue.add_item(title: "Foo")
      expect(@queue.items.last.id).to be_present
    end
  end

  describe "#schedule!" do
    it "should update next_scheduled_at"
    it "should update scheduled_at for items"
  end
end
