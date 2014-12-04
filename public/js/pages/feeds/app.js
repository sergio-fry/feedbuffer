define(["require", "text!./templates/feed.html"], function (require, feed_template) {
  console.log(feed_template);

  return {
    render: function() {
      return "Добавьте новый поток <img src='" + require.toUrl("./img/img1.jpeg") + "'/> <button>Добавить</button>";
    }
  };
});
