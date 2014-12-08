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
  end
end