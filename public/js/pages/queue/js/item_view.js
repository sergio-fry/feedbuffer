define([
  "jquery", "underscore", "api",
  "text!./../templates/item.html",
], function(
  $,  _, api, 
  template
) {

  var ItemView = Backbone.View.extend({
    tagName: "tr",
    events: {
    },
    template: _.template(template),

    render: function() {
      this.$el.html(this.template({ title: this.model.get('title'), url: this.model.get('url'), link: api.utils.URI(this.model.get('url')) }));

      return this.$el;
    },
  })

  return ItemView;
});

