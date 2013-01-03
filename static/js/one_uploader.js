(function() {
  var uploadStart;

  uploadStart = function(file) {
    return this.startUpload();
  };

  window.one_uploader = function(o) {
    var swf, uploadError, uploadSuccess;
    uploadError = function(file, code, msg) {
      if (o.error) {
        return o.error(file, code, msg);
      }
    };
    uploadSuccess = function(file, o) {
      if (o.success) {
        return o.success(file, o);
      }
    };
    return swf = new SWFUpload({
      flash_url: "/static/js/swfupload/swfupload.swf",
      upload_url: "http://v0.api.upyun.com/" + UPYUN[2] + "/",
      post_params: {
        policy: UPYUN[0],
        signature: UPYUN[1]
      },
      file_size_limit: "10 MB",
      file_types: "*.*",
      file_types_description: "Image Files",
      file_upload_limit: 1,
      file_queue_limit: 0,
      file_post_name: "img",
      custom_settings: {
        cancelButtonId: "btnCancel",
        uploaderTarget: "uploader"
      },
      debug: false,
      button_image_url: "/static/imgs/select-img-btn.png",
      button_width: "196",
      button_height: "48",
      button_placeholder_id: o.btnid,
      button_cursor: SWFUpload.CURSOR.HAND,
      upload_start_handler: uploadStart,
      upload_error_handler: uploadError,
      upload_success_handler: uploadSuccess
    });
  };

}).call(this);
