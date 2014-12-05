define(["jquery", "backbone", "humane"], function($, Backbone, humane) {
  var Feed = Backbone.Model.extend({
    url: function() {
      return "/api/v1/feeds/" + this.get("id");
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
