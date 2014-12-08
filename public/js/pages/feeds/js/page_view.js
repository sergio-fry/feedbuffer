define([
  "jquery", "backbone", "underscore", "require", "api",
  "./feed_view",
  "text!./../templates/page.html",
], function(
  $, Backbone, _, require, api,
  FeedView,
  page_template
) {

  var PageView = Backbone.View.extend({
    events: {
      "click .add-new-feed": "addNewFeed",
    },
    template: _.template(page_template),

    render: function() {
      var $el = this.$el;
      var template = this.template;

      this.$el.html(template()).append("<link rel='stylesheet' href='"+require.toUrl("./../css/style.css")+"'>");

      var feeds = api.feeds;
      
      feeds.fetch().then(function() {
        var table = $("<table>").attr({ class: "table table-striped", id: "feeds" }).append(
          "<tr><th></th><th>Сайт</th><th>URL</th><th></th></tr>"
        );

        feeds.chain().sortBy(function(f) { return f.get('id') }).each(function(feed) {
          table.append((new FeedView({ model: feed })).render());
        });

        $el.find(".table_wrapper").append(table);
      })

      return this.$el;
    },

    addNewFeed: function(event) {
      var feed = new (api.feeds.model)();
      var feed_view = new FeedView({ model: feed});
      feed_view.state = "STATE_EDIT" ;

      this.$el.find("#feeds").append(feed_view.render());

      feed_view.$el.find("[name='url']").focus();
      return false;
    }
  });

  return PageView;
})


