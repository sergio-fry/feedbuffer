require.config({
  urlArgs: "v=12",
  baseUrl: 'js',
  paths: {
    jquery: "vendor/jquery",
    depot: "vendor/depot.min",
    kizzy: "vendor/kizzy.min",
    underscore: "vendor/underscore",
    text: "vendor/requirejs-text",
    humane: "vendor/humane",
    backbone: "vendor/backbone"
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'humane': {
      exports: 'humane',
    },
    'backbone': {
      exports: 'Backbone'
    }
  }
});

require(["tabs", "underscore"], function(Tabs, _) {
  require(["jquery"], function() {
    require(["/bootstrap/js/bootstrap.min.js"]);
  });

  var pages = [
    ["queue", "Очередь"],
    ["content", "Новое"],
    ["history", "Публикации"],
    ["feeds-settings", "Настройка лент"],
  ];

  var page_module_paths = _.chain(pages).pluck('0').map(function(p) { return "pages/"+p+"/app" }).value();

  require(page_module_paths, function() {
    var page_modules = arguments;

    _.each(pages, function(p, index) {
      var page = page_modules[index];
      var id = p[0], title = p[1];

      Tabs.add_page(id, page, title);

      if((window.location.hash == "" && index == 0) || window.location.hash == "#" + id) {
        Tabs.select_page(id);
      }
    });
  })
});
