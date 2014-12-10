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
    initialize: function() {
      this.feed_fetcher = new FeedFetcher();
    },

    events: {
    },
    template: _.template(template),

    render: function() {
      this.$el.html(this.template()).append("<link rel='stylesheet' href='"+require.toUrl("./../css/style.css")+"'>");

      var wrapper = $("<div>");

      var queued_urls = api.queue.map(function(el, i) { return el.get('url') });

      var feed_urls = _(api.feeds.map(function(f) { return f.get('url') })).uniq();

      this.feed_fetcher.fetch_items(feed_urls, { limit: 20, limit_per_feed: 10 }, function(items) {
        _.chain(items).reject(function(el) {
          return queued_urls.indexOf(el.link) != -1 ;
        }).each(function(item) {
          wrapper.append(new ItemView({ item: item }).render());
        });
      });

      this.$el.find("#feed_wrapper").append(wrapper);
      
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


