define(["jquery", "underscore"], function ($, _) {
  var tabs = $("#page-tabs");

  var pages_tabs = tabs.find("ul.nav-tabs");
  var pages_content = tabs.find(".tab-content");

  var pages = {};

  var add_page = function(id, page, title) {
    pages[id] = page;

    var tab = $("<a aria-controls='home' role='tab' data-toggle='tab'>").text(title).attr({ href: "#" + id }).data("page", page);

    var tab_content = $("<div role='tabpanel' class='tab-pane' id='"+id+"'></div>");

    pages_tabs.append($("<li role='presentation'></li>").append(tab));
    pages_content.append(tab_content);
  }

  var select_page = function(id) {
    pages_tabs.find("a[href='#"+id+"']").tab('show');
  }

  tabs.on("show.bs.tab", function(event) {
    var tab_id = $(event.target).attr("href").replace("#", "");
    var page = pages[tab_id];

    window.location.hash = tab_id;

    if(!$(page).data("rendered")) {
      page.render($("#" + tab_id));
      $(page).data("rendered", true);
    }
  });

  return {
    add_page: add_page,
    select_page: select_page,
  };
});

