
window.one_uploader = (o) ->
    
    uploadStart = (file) ->
	    this.startUpload()
        if o.start
            o.start(file)

    uploadError = (file,code,msg)->
        if o.error
            o.error(file,code,msg)

    uploadSuccess = (file,o)->
        if o.success
            o.success(file,o)

    swf = new SWFUpload(
        flash_url: "/static/js/swfupload/swfupload.swf"
        upload_url: "http://v0.api.upyun.com/" + UPYUN[2] + "/"
        post_params:
          policy: UPYUN[0]
          signature: UPYUN[1]

        file_size_limit: "10 MB"
        file_types: "*.*"
        file_types_description: "Image Files"
        file_upload_limit: 1
        file_queue_limit: 0
        file_post_name: "img"
        custom_settings:
          cancelButtonId: "btnCancel"
          uploaderTarget: "uploader"

        debug: false

        # Button settings
        button_image_url: "/static/imgs/select-img-btn.png"
        button_width: "196"
        button_height: "48"

        button_placeholder_id: o.btnid

        button_cursor: SWFUpload.CURSOR.HAND

        #button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,

        #swfupload_loaded_handler : swfuploadLoad,
        #file_queued_handler: fileQueued
        #file_queue_error_handler: fileQueueError
        #file_dialog_complete_handler: fileDialogComplete

        #file_dialog_start_handler : fileDialogStar,
        upload_start_handler: uploadStart
        #upload_progress_handler: uploadProgress
        upload_error_handler: uploadError
        upload_success_handler: uploadSuccess
        #upload_complete_handler: uploadComplete
    )

