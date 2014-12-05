define([
  "jquery", "backbone", "underscore", "require", "api",
  "text!./../templates/feed.html",
  "text!./../templates/feed_form.html"
], function(
  $, Backbone, _, require, api,
  feed_template,
  feed_template_edit
) {
  var FeedView = Backbone.View.extend({
    events: {
      "click .actions .edit": "onClickEdit",
      "click .actions .save": "onClickSave",
      "click .actions .cancel": "onClickCancel",
      "click .actions .delete": "onClickDelete",
    },
    tagName: "tr",

    template: function() {
      if(this.state == "STATE_EDIT") {
        return this.template_edit(arguments[0]);
      } else {
        return this.template_show(arguments[0]);
      }
    },

    template_show: _.template(feed_template),
    template_edit: _.template(feed_template_edit),

    render: function() {
      return this.$el.html(this.template({
        id: this.model.get("id"),
        title: this.model.get("title"),
        url: this.model.get("url")
      }));
    },

    onClickCancel: function() {
      this.state = "STATE_SHOW"
      this.render();

      return false;
    },

    onClickSave: function() {
      this.model.set({
        url: this.$el.find("[name='url']").val()
      });

      widget = this;

      this.$el.find(".actions a").addClass("disabled");
      this.model.save().always(function() {
        widget.state = "STATE_SHOW"
        widget.render();
      }).fail(function() {
        api.notify.error("Не удалось сохранить ленту " + widget.model.get("title"));
      });

      return false;
    },

    onClickDelete: function() {
      widget = this;

      this.$el.find(".actions a").addClass("disabled");

      this.model.destroy().then(function() {
        widget.$el.replaceWith("<tr><td colspan='4' class='deleted'>Лента "+widget.model.get('title')+" удалена</td></tr>");
      }).fail(function() {
        api.notify.error("Не удалось удалить ленту " + widget.model.get("title"));
        widget.state = "STATE_SHOW"
        widget.render();
      });

      return false;
    },

    onClickEdit: function() {
      this.state = "STATE_EDIT"
      this.render();

      return false;
    }
  });

  return FeedView;
})

