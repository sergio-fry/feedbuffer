define(function() {
  
  var URI = function(url) {
    var l = document.createElement("a");
    l.href = url;
    l.favicon = "http://www.google.com/s2/favicons?domain="+l.hostname;
    return l;
  }

  return URI;
});

