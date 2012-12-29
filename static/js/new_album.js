(function() {
  var album_box, album_li, album_select_wrapper, define_str, reset_album_new_box, select_btn, select_exists, uploader_header;

  define_str = "选择已有专辑";

  select_btn = $(".album-select-btn");

  album_select_wrapper = $(".album-select-wrapper");

  album_box = $(".album-select-box");

  album_li = $(".album-select-li");

  uploader_header = $(".uploader-header");

  select_exists = $(".select-exists-album");

  reset_album_new_box = function() {
    if (album_box.height() > 307) {
      album_box.css({
        'height': 307,
        'overflow-y': 'auto'
      });
    }
    return album_box.css({
      left: select_btn.offset().left,
      top: select_btn.offset().top + 50
    });
  };

  select_btn.click(function() {
    if (album_box.is(':visible')) {
      return album_box.hide();
    } else {
      reset_album_new_box();
      return album_box.fadeIn();
    }
  });

  album_li.click(function() {
    var album_id, self;
    self = $(this);
    album_id = self.data('id');
    select_btn.find('span').text(self.find('span').text());
    $('input[name=name]').val(self.find('span').text());
    $("input[name=album_id]").val(album_id);
    self.parent().hide();
    return album_select_wrapper.slideDown(function() {
      $(this).hide();
      return uploader_header.show();
    });
  });

  select_exists.click(function() {
    return album_select_wrapper.fadeIn();
  });

  $(function() {
    return $(window).resize(function() {
      return reset_album_new_box();
    });
  });

}).call(this);
