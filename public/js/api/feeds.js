define([
  "jquery", "backbone",
  "./uri",
], function(
  $, Backbone,
  URI
) {

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

  var feeds = new FeedsCollection();

  return feeds;
});
