define(["jquery", "underscore"], function ($, _) {
  var tabs = $("#page-tabs");

  var pages_tabs = tabs.find("ul.nav-tabs");
  var pages_content = tabs.find(".tab-content");

  var page_ids = {};
  var pages = {};

  var add_page = function(title, page) {
    var id = _.uniqueId("page-tab");
    page_ids[page] = id;
    pages[id] = page;

    var tab = $("<a aria-controls='home' role='tab' data-toggle='tab'>").text(title).attr({ href: "#" + id }).data("page", page);

    var tab_content = $("<div role='tabpanel' class='tab-pane' id='"+id+"'></div>");

    pages_tabs.append($("<li role='presentation'></li>").append(tab));
    pages_content.append(tab_content);
  }

  var select_page = function(page) {
    pages_tabs.find("a[href='#"+page_ids[page]+"']").tab('show');
  }

  tabs.on("show.bs.tab", function(event) {
    var tab_id = $(event.target).attr("href").replace("#", "");
    var page = pages[tab_id];
    console.log("#" + tab_id);

    page.render($("#" + tab_id));
  });

  return {
    add_page: add_page,
    select_page: select_page,
  };
});

