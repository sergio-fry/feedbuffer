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

  describe "#delete_item" do
    before do
      @item = @queue.add_item :title => "foo"
    end

    it "should delete item from queue" do
      expect do
        @queue.delete_item(@item.id)
      end.to change{ @queue.items.size }.by(-1)
    end
  end

  describe "#schedule!" do
    it "should update next_scheduled_at" do
      item = @queue.add_item :title => "foo"
      @queue.schedule!

      expect(@queue.next_scheduled_at).to be_present
    end

    it "should update scheduled_at for items" do
      item = @queue.add_item :title => "foo"
      @queue.schedule!

      expect(@queue.find_item(item.id).scheduled_at).to be_present
    end
  end

  describe "#export!" do
    before do
      @export_history = ExportHistory.new
      allow(@queue).to receive(:export_history).and_return(@export_history)

      @item = @queue.add_item :title => "foo"
    end

    it "should export expired item" do
      @queue.update_item(@item.id, :scheduled_at => 1.minute.ago)

      expect(@export_history).to receive(:unshift_item) do |attrs|
        expect(attrs["title"]).to eq("foo")
      end

      expect do
        @queue.export!
      end.to change{ @queue.items.size }.by(-1)
    end

    it "should not export item scheduled to future"
  end
end
