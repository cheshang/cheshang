(function() {
  var one_settings;

  one_settings = {
    btnid: "upload-avatar",
    start: function(file) {
      return console.log(file, 'start');
    },
    error: function(file, code, msg) {},
    success: function(file, serverData) {
      var o, src;
      console.log(file, serverData, 'succ callback');
      o = JSON.parse(serverData);
      src = 'http://' + UPYUN[3] + s.url + '!1';
      return console.log(o, src, '===');
    }
  };

  one_uploader(one_settings);

}).call(this);
