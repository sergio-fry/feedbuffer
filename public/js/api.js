define([
  "jquery", "backbone", "humane",
  "api/feeds",
  "api/queue",
  "api/history",
  "api/uri",
], function(
  $, Backbone, humane,
  feeds,
  queue,
  history,
  URI
) {

  var notifications = {
    base: humane.log,
    info: humane.spawn({ addnCls: 'humane-libnotify-info' }),
    error: humane.spawn({ addnCls: 'humane-libnotify-error' })
  }

  feeds.fetch();
  queue.fetch();
  history.fetch();

  return {
    feeds: feeds,
    queue: queue,
    history: history,

    notify: notifications,

    utils: {
      URI: URI,
    }
  }
});
