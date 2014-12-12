define([
  "jquery", "underscore", "api",
  "text!./../templates/item.html",
], function(
  $,  _, api, 
  template
) {

  var ItemView = Backbone.View.extend({
    events: {
      "mouseover": "showControls",
      "mouseout": "hideControls",
      "click .actions .delete": "delete",
    },
    template: _.template(template),

    render: function() {
      this.$el.html(this.template({
        title: this.model.get('title'),
        url: this.model.get('url'),
        link: api.utils.URI(this.model.get('url')),
        published_at: this.model.get('published_at'),
      }));

      return this.$el;
    },

    showControls: function() {
      this.$el.find(".actions").removeClass("invisible");
    },

    hideControls: function() {
      this.$el.find(".actions").addClass("invisible");
    },

    "delete": function() {
      this.$el.find("btn").addClass("disabled");
      var widget = this;

      this.model.destroy().then(function() {
        widget.$el.fadeOut();
      }).fail(function() {
        widget.$el.fadeOut();
      });

      return false;
    }
  })

  return ItemView;
});

