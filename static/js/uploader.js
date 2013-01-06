$(document).ready(function(){
	$(document).scroll(function(){
		if($(document).scrollTop() >= 190){
			$('.post-btn-box').addClass('post-btn-box-fixed')
		}else{
			$('.post-btn-box').removeClass('post-btn-box-fixed')
		}
	});
	
})


function swfUploader(o){

    //console.log(UPYUN)

    return new SWFUpload({
        flash_url : "/static/js/swfupload/swfupload.swf",
        upload_url: "http://v0.api.upyun.com/"+UPYUN[2]+'/',
        post_params: {
            'policy' 	: UPYUN[0],
            'signature' : UPYUN[1]
        },
        file_size_limit : "10 MB",
        //file_types : "*.*",
        file_types : suffix_any_case('jpg png gif bmp jpeg'),
        file_types_description : "All Image Files",
        file_upload_limit : 200,
        file_queue_limit : 0,
        file_post_name : 'file',
        custom_settings : {
            progressTarget : "upload-progress-wrapper",
            cancelButtonId : "btnCancel",
            uploaderTarget : "uploader",
            totalProgressTarget : "total-progress"
        },
        debug: false,

        // Button settings
        button_image_url: "/static/imgs/select-img-btn.png",
        button_width: "196",
        button_height: "48",
        //button_placeholder_id: "spanButtonPlaceHolder",
        button_placeholder_id: "file-selecter",
        //button_text: '<span class="theFont">选择图片</span>',
        //button_text_style: ".theFont { font-size: 16; opacity:0;}",
        //button_text_left_padding: 0,
        //button_text_top_padding: 0,
        button_cursor: SWFUpload.CURSOR.HAND,
        //button_action : SWFUpload.BUTTON_ACTION.SELECT_FILES,
        
        // The event handler functions are defined in handlers.js
        //swfupload_loaded_handler : swfuploadLoad,
        file_queued_handler : fileQueued,
        file_queue_error_handler : fileQueueError,
        file_dialog_complete_handler : fileDialogComplete,
        //file_dialog_start_handler : fileDialogStar,
        upload_start_handler : uploadStart,
        upload_progress_handler : uploadProgress,
        upload_error_handler : uploadError,
        upload_success_handler : uploadSuccess,
        upload_complete_handler : uploadComplete,
        queue_complete_handler : queueComplete	// Queue plugin event
    })
}
swfUploader()
