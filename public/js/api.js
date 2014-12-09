define(["jquery", "backbone", "humane"], function($, Backbone, humane) {
  var Feed = Backbone.Model.extend({
    urlRoot: "/api/v1/feeds",
    favicon_url: function() {
      return URI(this.get('url')).favicon;
    },
  });

  var FeedsCollection = Backbone.Collection.extend({
    url: "/api/v1/feeds",
    model: Feed,
  });

  var QueueItem = Backbone.Model.extend({
    urlRoot: "/api/v1/queue/items",
  });

  var QueueCollection = Backbone.Collection.extend({
    url: "/api/v1/queue/items",
    model: QueueItem,
  });

  var notifications = {
    base: humane.log,
    info: humane.spawn({ addnCls: 'humane-libnotify-info' }),
    error: humane.spawn({ addnCls: 'humane-libnotify-error' })
  }
  
  var URI = function(url) {
    var l = document.createElement("a");
    l.href = url;
    l.favicon = "http://g.etfv.co/"+l.protocol+"//"+l.hostname;
    return l;
  }

  var feeds = new FeedsCollection()
  var queue = new QueueCollection()

  return {
    feeds: feeds,
    queue: queue,
    notify: notifications,

    utils: {
      URI: URI,
    }
  }
});
