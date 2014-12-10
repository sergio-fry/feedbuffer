define(["jquery", "backbone"], function($, Backbone) {
  var QueueItem = Backbone.Model.extend({
    urlRoot: "/api/v1/queue/items",
  });

  var QueueCollection = Backbone.Collection.extend({
    url: "/api/v1/queue/items",
    model: QueueItem,
  });

  var queue = new QueueCollection();

  return queue;
});

