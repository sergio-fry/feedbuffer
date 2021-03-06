module Api
  class Api < Grape::API
    format :json

    get :status do
      { status: "ok" }
    end


    namespace :feeds do
      module Entities
        class Feed < Grape::Entity
          expose :id
          expose :title
          expose :url
          expose :created_at
        end
      end

      get do
        Feed.all
        present Feed.all, with: Entities::Feed
      end

      params do
        requires :url, type: String
      end
      post do
        @feed = Feed.new({
          url: params[:url]
        })

        @feed.save!

        present @feed, with: Entities::Feed
      end


      namespace ':feed_id' do
        before do
          @feed = Feed.find(params[:feed_id])
        end

        delete do
          @feed.destroy!
        end

        params do
          requires :url, type: String
        end
        put do
          @feed.update!({
            url: params[:url],
          })

          present @feed, with: Entities::Feed
        end
      end
    end

    namespace :queue do
      module Entities
        class QueueItem < Grape::Entity
          expose :id
          expose :title
          expose :url
          expose :scheduled_at
        end
      end

      before do
        @queue = ExportQueue.first || ExportQueue.create
      end

      namespace :items do
        get do
          present @queue.items, with: Entities::QueueItem
        end

        params do
          requires :title, type: String
          optional :url, type: String
        end
        post do
          @item = @queue.add_item(params.extract!(:title, :url))
          @queue.save!

          present @queue.find_item(@item.id), with: Entities::QueueItem
        end

        namespace ':item_id' do
          delete do
            @queue.delete_item(params[:item_id])
            @queue.schedule!
            @queue.save!
          end
        end
      end
    end

    namespace :history do
      module Entities
        class HistoryItem < Grape::Entity
          expose :id
          expose :title
          expose :url
          expose :published_at
        end
      end

      before do
        @history = ExportHistory.first || ExportHistory.create
      end

      namespace :items do
        get do
          present @history.items, with: Entities::HistoryItem
        end
      end
    end
  end
end
