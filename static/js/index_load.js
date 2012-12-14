(function() {
  var stream;

  if (!stream) {
    stream = $.stream(function(load_count, data) {
      return "/xxxx/xxx" + (load_count + 1);
    }, function(li, has_more) {}, 10, data_parser);
  }

  stream();

}).call(this);
