require.config({
  urlArgs: "v=2",
  baseUrl: 'js',
  paths: {
    jquery: "vendor/jquery",
    underscore: "vendor/underscore"
  },
  // Add this map config in addition to any baseUrl or
  // paths config you may already have in the project.
  map: {
    // '*' means all modules will get 'jquery-private'
    // for their 'jquery' dependency.
    '*': { 'jquery': 'jquery-no-conflict' },

    // 'jquery-private' wants the real jQuery module
    // though. If this line was not here, there would
    // be an unresolvable cyclic dependency.
    'jquery-no-conflict': { 'jquery': 'jquery' }
  },
  shim: {
    'underscore': {
      exports: '_'
    }
  }
});

require(["core", "underscore"], function(core, _) {

  var pages = [
    ["Профиль", "profile"],
    ["Потоки", "feeds"],
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
