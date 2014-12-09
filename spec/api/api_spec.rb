require 'rails_helper'

RSpec.describe Api::Api, type: :request do
  before do
    ExportQueue.delete_all
    @queue = ExportQueue.create
  end

  describe "GET /api/v1/queue/items" do
    it "returns an empty array when no items" do
      get "/api/v1/queue/items"
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to eq []
    end

    it "returns an array of items" do
      @queue.add_item(title: "foo", url: "http://bar.com")
      @queue.schedule!
      @queue.save!

      get "/api/v1/queue/items"
      expect(response.status).to eq(200)

      JSON.parse(response.body).first.tap do |item_attrs|
        expect(item_attrs["title"]).to eq("foo")
        expect(item_attrs["url"]).to eq("http://bar.com")
      end
    end
  end

  describe "POST /api/v1/queue/items" do
    it "add new item to queue" do
      expect do
        post "/api/v1/queue/items", { title: "foo", url: "http://bar.com" }
        expect(response.status).to eq(201)
      end.to change{ @queue.reload.items.size }.by(1)

      JSON.parse(response.body).tap do |item_attrs|
        expect(item_attrs["title"]).to eq("foo")
        expect(item_attrs["url"]).to eq("http://bar.com")
      end
    end
  end
end

