define(["jquery"], function ($) {
  var pages_nav = $("#pages-nav");
  var page_content = $("#page-content");

  var add_page = function(title, page) {
    var button = $("<span>").text(title).data("page", page).click(function() {
      select_page(page);
      return false;
    });

    pages_nav.append(button);
  }

  var select_page = function(page) {
    page_content.html(page.render());
  }

  return {
    add_page: add_page,
    select_page: select_page,
  };
});

