define(["jquery", "backbone"], function($, Backbone) {
  var HistoryItem = Backbone.Model.extend({
    urlRoot: "/api/v1/history/items",
  });

  var HistoryCollection = Backbone.Collection.extend({
    url: "/api/v1/history/items",
    model: HistoryItem,
  });

  var history = new HistoryCollection();

  return history;
});


