define([
  "jquery", "backbone", "underscore", "require", "api",
  "./js/page_view",
], function (
  $, Backbone, _, require, api,
  PageView
) {

  var page = new PageView();

  return {
    render: function($el) {
      page.setElement($el);

      page.render();

      api.feeds.on("add remove change", function() {
        page.render();
      });

      api.queue.on("add remove change", function() {
        page.render();
      });

      return page.$el;
    }
  };
});
