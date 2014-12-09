define([
  "jquery", "backbone", "underscore", "require", "api",
  "./item_view", 
  "text!./../templates/page.html",
], function(
  $, Backbone, _, require, api,
  ItemView,
  template
) {

  var PageView = Backbone.View.extend({
    initialize: function() {
    },
    events: {
    },
    template: _.template(template),

    render: function() {
      var $el = this.$el;
      var template = this.template;

      this.$el.html(template()).append("<link rel='stylesheet' href='"+require.toUrl("./../css/style.css")+"'>");

      var widget = this;

      var wrapper = $("<div>");

      api.queue.each(function(item) {
        wrapper.append(new ItemView({ model: item }).render());
      });

      $el.find("#queue_wrapper").append(wrapper);
      
      return this.$el;
    },

  });

  return PageView;
})


