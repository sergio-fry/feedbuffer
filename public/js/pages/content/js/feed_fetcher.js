define([
  "jquery", "underscore", "api",
], function(
  $,  _, api
) {

  var FeedFetcher = function(feeds) {
    this.feeds = _(feeds);
  }

  FeedFetcher.prototype.fetch_items = function(options, callback) {
    var fetcher = this;
    var items = [];

    var _callback = _.after(this.feeds.size(), callback);

    this.feeds.each(function(feed_url) {
      fetcher.fetch_feed(feed_url, options).then(function(_items) {
        items = _.union(items, _items.responseData.feed.entries);
        
        items = _(items).sortBy(function(item) {
          return Date.parse(item.publishedDate);
        });
      }).always(function() {
        _callback(_(items.reverse()).toArray().slice(0, options.limit || 10));
      });
    });
  }


  FeedFetcher.prototype.fetch_feed = function(feed_url, options, callback) {
    var service_url = "https://ajax.googleapis.com/ajax/services/feed/load";

    return $.ajax(service_url, {
      data: {
        q: feed_url,
        v: "1.0",
        num: options["limit_per_feed"] || 10,
      },
      dataType: 'jsonp',
    });
  }

  return FeedFetcher;
});
