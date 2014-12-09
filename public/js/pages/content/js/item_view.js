define([
  "jquery", "underscore", "api", "kizzy",
  "text!./../templates/item.html",
], function(
  $,  _, api, Store,
  template
) {
  var store = Store("content");
  if(store.get("published_urls") == undefined) {
    store.set("published_urls", [])
  }

  var ItemView = Backbone.View.extend({
    initialize: function(options) {
      this.item = options.item;
    },
    tagName: "tr",
    events: {
      "click .actions .add-to-queue": "addToQueue",
    },
    template: _.template(template),

    render: function() {
      this.$el.html(this.template({ title: this.item.title, url: this.item.link, link: api.utils.URI(this.item.link) }));

      return this.$el;
    },

    addToQueue: function() {
      var widget = this;
      this.$el.find(".actions a").addClass("disabled");

      var model = api.queue.add({
        title: this.item.title,
        url: this.item.link,
      })

      model.save().then(function() {
        api.queue.add(model);
        api.notify.info("Запись успешно добавлена в очередь");
        widget.$el.fadeOut();

        var published_urls = store.get("published_urls");
        published_urls.push(model.get("url"))
        store.set("published_urls", published_urls);
      }).fail(function() {
        api.notify.error("Не удалось добавить запись в очередь");
        widget.$el.find(".actions a").removeClass("disabled");
      });

      return false;
    }
  })

  return ItemView;
});

