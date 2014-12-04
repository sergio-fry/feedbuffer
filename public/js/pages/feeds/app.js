define(["jquery", "require", "text!./templates/feed.html"], function ($, require, feed_template) {
  return {
    render: function($el) {
      return $el.html("Добавьте новый поток <img src='" + require.toUrl("./img/img1.jpeg") + "'/> <button>Добавить</button>");
    }
  };
});
