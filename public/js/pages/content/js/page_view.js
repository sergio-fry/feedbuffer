define([
  "jquery", "backbone", "underscore", "require", "api",
  "./feed_fetcher", 
  "./item_view", 
  "text!./../templates/page.html",
], function(
  $, Backbone, _, require, api,
  FeedFetcher,
  ItemView,
  template
) {

  var PageView = Backbone.View.extend({
    events: {
    },
    template: _.template(template),

    render: function() {
      var $el = this.$el;
      var template = this.template;

      this.$el.html(template()).append("<link rel='stylesheet' href='"+require.toUrl("./../css/style.css")+"'>");

      var feeds = api.feeds;


      var widget = this;
      feeds.fetch().then(function() {
        var feed_fetcher = new FeedFetcher(_(feeds.map(function(f) { return f.get('url') })).uniq());

        var wrapper = $("<div>");

        api.queue.fetch().then(function() {
          var queued_urls = api.queue.map(function(el, i) { return el.get('url') });

          feed_fetcher.fetch_items({ limit: 20, limit_per_feed: 10 }, function(items) {
            _.chain(items).reject(function(el) {
              return queued_urls.indexOf(el.link) != -1 ;
            }).each(function(item) {
              wrapper.append(new ItemView({ item: item }).render());
            });
          });
        });

        $el.find("#feed_wrapper").append(wrapper);
      })
      
      return this.$el;
    },

    addNewFeed: function(event) {
      var feed = new (api.feeds.model)();
      var feed_view = new FeedView({ model: feed});
      feed_view.state = "STATE_EDIT" ;

      this.$el.find("#feeds").append(feed_view.render());

      feed_view.$el.find("[name='url']").focus();
      return false;
    }
  });

  return PageView;
})


