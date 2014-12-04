require.config({
  urlArgs: "v=5",
  baseUrl: 'js',
  paths: {
    jquery: "vendor/jquery",
    underscore: "vendor/underscore",
    text: "vendor/requirejs-text"
  },
  shim: {
    'underscore': {
      exports: '_'
    }
  }
});

require(["core", "underscore"], function(core, _) {
  require(["jquery"], function() {
    require(["/bootstrap/js/bootstrap.min.js"]);
  });

  var pages = [
    ["Потоки", "feeds"],
    ["Очередь", "queue"],
  ];

  var page_module_paths = _.chain(pages).pluck('1').map(function(p) { return "pages/"+p+"/app" }).value();

  require(page_module_paths, function() {
    var page_modules = arguments;

    _.each(pages, function(p, index) {
      var page = page_modules[index];

      core.add_page(p[0], page);
      if(index==0) { core.select_page(page); }
    });
  })
});
