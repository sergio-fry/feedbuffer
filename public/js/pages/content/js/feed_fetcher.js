define([
  "jquery", "underscore", "api",
], function(
  $, _, api
) {

  var FeedFetcher = function(options) {
    this.options = _.extend({
      limit: 10,
      limit_per_feed: 10,
    }, options);

    this.cache = {};
  }

  FeedFetcher.prototype.fetch_items = function(feed_urls, callback) {
    var fetcher = this;
    var items = [];

    var _callback = _.after(_(feed_urls).size(), callback);

    _(feed_urls).each(function(feed_url) {
      fetcher.fetch_feed(feed_url).then(function(_items) {
        items = _.union(items, _items.responseData.feed.entries);
        
        items = _(items).sortBy(function(item) {
          return Date.parse(item.publishedDate);
        });
      }).always(function() {
        _callback(_(items.reverse()).toArray().slice(0, fetcher.options.limit));
      });
    });
  }


  FeedFetcher.prototype.fetch_feed = function(feed_url, callback) {
    var service_url = "https://ajax.googleapis.com/ajax/services/feed/load";
    var fetcher = this;

    var promise = this.cached_response(feed_url) || $.ajax(service_url, {
      data: {
        q: feed_url,
        v: "1.0",
        num: fetcher.options["limit_per_feed"],
      },
      dataType: 'jsonp',
    }).promise();

    this.save_response(feed_url, promise);

    return promise;
  }

  FeedFetcher.prototype.cached_response = function(feed_url) {
    return this.cache[feed_url];
  }

  FeedFetcher.prototype.save_response = function(feed_url, promise) {
    return this.cache[feed_url] = promise;
  }

  return FeedFetcher;
});
