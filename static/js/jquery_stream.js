(function() {

  jQuery.extend({
    stream: function(next_url, render, page_size, data_parser, buffer_size) {
      var buffer, data, has_more, is_loading, load_count, _loader, _render;
      buffer = [];
      buffer_size = buffer_size || page_size * 5;
      has_more = true;
      is_loading = false;
      load_count = 0;
      data = null;
      _loader = function() {
        var url;
        if (is_loading || !has_more) {
          return;
        }
        is_loading = true;
        url = next_url(load_count, data);
        data = null;
        return $.getJSON(url, function(o) {
          if (data_parser) {
            o = data_parser(o);
          }
          if (!o.length) {
            has_more = is_loading = false;
          } else {
            data = o;
            buffer.push.apply(buffer, o);
            load_count += 1;
            is_loading = false;
          }
          return _render();
        });
      };
      _render = function() {
        var buffer_length, o;
        buffer_length = buffer.length;
        if (buffer_length < page_size && has_more) {
          return _loader();
        } else if (buffer.length) {
          o = buffer.slice(0, (page_size - 1) + 1 || 9e9);
          buffer = buffer.slice(page_size);
          render(o, has_more);
          if ((buffer.length < buffer_size) && has_more) {
            return _loader();
          }
        }
      };
      return _render;
    }
  });

}).call(this);
