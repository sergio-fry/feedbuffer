define(["jquery", "backbone", "humane"], function($, Backbone, humane) {
  var Feed = Backbone.Model.extend({
    urlRoot: "/api/v1/feeds",
    favicon_url: function() {
      var l = document.createElement("a");
      l.href = this.get('url');
      return "http://g.etfv.co/"+l.protocol+"//"+l.hostname;
    },
  });

  var FeedsCollection = Backbone.Collection.extend({
    url: "/api/v1/feeds",
    model: Feed,
  });

  var notifications = {
    base: humane.log,
    info: humane.spawn({ addnCls: 'humane-libnotify-info' }),
    error: humane.spawn({ addnCls: 'humane-libnotify-error' })
  }

  return {
    feeds: new FeedsCollection(),
    notify: notifications
  }
});
