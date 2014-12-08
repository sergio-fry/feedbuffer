require.config({
  urlArgs: "v=7",
  baseUrl: 'js',
  paths: {
    jquery: "vendor/jquery",
    underscore: "vendor/underscore",
    text: "vendor/requirejs-text",
    humane: "vendor/humane",
    //backbone: "vendor/backbone"
    backbone: "http://backbonejs.org/backbone"
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

require(["core", "underscore"], function(core, _) {
  require(["jquery"], function() {
    require(["/bootstrap/js/bootstrap.min.js"]);
  });

  var pages = [
    ["feeds-settings", "Настройка лент"],
    ["queue", "Очередь"],
  ];

  var page_module_paths = _.chain(pages).pluck('0').map(function(p) { return "pages/"+p+"/app" }).value();

  require(page_module_paths, function() {
    var page_modules = arguments;

    _.each(pages, function(p, index) {
      var page = page_modules[index];
      var id = p[0], title = p[1];

      core.add_page(id, page, title);

      if((window.location.hash == "" && index == 0) || window.location.hash == "#" + id) {
        core.select_page(id);
      }
    });
  })
});
