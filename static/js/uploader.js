$(document).ready(function(){
	$(document).scroll(function(){
		console.log( $(document).scrollTop() )
		if($(document).scrollTop() >= 190){
			if($('.uploader-header').css('position')!='fixed'){
				$('.uploader-header').css({'position':'fixed','top':'0','border-radius':'0'})
			}
		}else{
			if($('.uploader-header').css('position')!='absolute'){
				$('.uploader-header').css({'position':'absolute','top':'','border-radius':'8px'})
			}
		}
	});
	
	//img upload
	var swfu;
	
	var settings = {
		flash_url : "static/js/swfupload/swfupload.swf",
		upload_url: "http://vo.upyun.com",
		//post_params: {"PHPSESSID" : ""},
		file_size_limit : "100 MB",
		file_types : "*.*",
		file_types_description : "All Files",
		file_upload_limit : 100,
		file_queue_limit : 0,
		custom_settings : {
			progressTarget : "fsUploadProgress",
			cancelButtonId : "btnCancel"
		},
		debug: false,

		// Button settings
		button_image_url: "static/imgs/select-img-btn.png",
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
		file_queued_handler : fileQueued,
		file_queue_error_handler : fileQueueError,
		file_dialog_complete_handler : fileDialogComplete,
		upload_start_handler : uploadStart,
		upload_progress_handler : uploadProgress,
		upload_error_handler : uploadError,
		upload_success_handler : uploadSuccess,
		upload_complete_handler : uploadComplete,
		queue_complete_handler : queueComplete	// Queue plugin event
	};

	swfu = new SWFUpload(settings);
})