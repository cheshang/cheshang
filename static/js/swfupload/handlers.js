
var TOTAL_UPLOAD_NUM = 0;

function fileQueued(file) {
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("Pending...");
		progress.toggleCancel(true, this);
	} catch (ex) {
		this.debug(ex);
	}
}

function fileQueueError(file, errorCode, message) {
	try {
		if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
			alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
			return;
		}

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
			progress.setStatus("File is too big.");
			this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
			progress.setStatus("Cannot upload Zero Byte files.");
			this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
			progress.setStatus("Invalid File Type.");
			this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		default:
			if (file !== null) {
				progress.setStatus("Unhandled Error");
			}
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

//文件选择后
function fileDialogComplete(numFilesSelected, numFilesQueued) {
	try {
		if (numFilesSelected > 0) {
		    //document.getElementById(this.customSettings.cancelButtonId).disabled = false;
            
		    //document.getElementById(this.customSettings.uploaderTarget).style.display = 'none';
		    //document.getElementById(this.customSettings.totalProgressTarget).style.display = 'block';

            TOTAL_UPLOAD_NUM = numFilesSelected;
		    this.startUpload();
		}
	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(file) {
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setStatus("Uploading...");
		progress.toggleCancel(true, this);
        
        progress.showTotalProgress();
	}
	catch (ex) {}
	
	return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {
	try {
		var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setProgress(percent);
		progress.setStatus("Uploading...");

        var _queued = this.getStats().files_queued; //队列中的文件数
        var _in_progress = this.getStats().in_progress; //
        var _uploaded = this.getStats().successful_uploads; //上传成功的文件数
        var _errors = this.getStats().upload_errors; //出错文件数
        var _canceled = this.getStats().upload_cancelled; //被取消文件数
        var _total_percent = Math.ceil( (_uploaded * 100) / TOTAL_UPLOAD_NUM); //总的上传进度

        var pre_progress = Math.ceil( (100*1) / TOTAL_UPLOAD_NUM )
        TOTAL_PROGRESS = Math.ceil((pre_progress*percent)/100)
        var total_percent = TOTAL_PROGRESS + _total_percent;

        //console.log(TOTAL_UPLOAD_NUM,_queued,_uploaded,total_percent,'=== upload status data')

        if(total_percent > 100){
            total_percent = 100
        }
        $('.total-progress').css('width',total_percent+'%')
        $('.total-progress-tit').html('上传总进度：'+total_percent+'%')
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
        var s = JSON.parse(serverData)
		progress.setComplete();
		progress.setStatus("Complete.");
		progress.toggleCancel(false);

        var src = 'http://'+UPYUN[3]+s.url+'!1'
        //把上传成功的图片渲染到页面
        var tpl = '<div class="uploader-photo-list" id="uploaded_'+file.id+'">'+
                '<div class="uploader-photo-imgbox">'+
                    '<img src="'+src+'" />'+
                '</div>'+
                '<div class="uploader-photo-dec">'+
                    '<textarea name="name" placeholder="图片描述"></textarea>'+
                    '<input type="hidden" name="url" value="'+s.url.substr(1)+'" />'+
                    '<input type="hidden" name="size" value="'+s['image-width']+","+s['image-height']+'" />'+
                '</div>'+
                '<div class="uploader-photo-tools">'+
                    '<span class="photo-delete"></span>'+
                '</div>'+
                ''+
            '</div>';
        $('#'+file.id).replaceWith(tpl)

        //页面滚动到改图位置
        var _top = $('body').find("#uploaded_"+file.id).offset().top
        //console.log(_top,'_top')
        $('body').animate({scrollTop:_top},1000,"easeInOutQuart")

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
    //console.log(file,errorCode,message,'== error ==')
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setError();
		progress.toggleCancel(false);

		switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			progress.setStatus("Upload Error: " + message);
			this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			progress.setStatus("Upload Failed.");
			this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			progress.setStatus("Server (IO) Error");
			this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			progress.setStatus("Security Error");
			this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			progress.setStatus("Upload limit exceeded.");
			this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			progress.setStatus("Failed Validation.  Upload skipped.");
			this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			// If there aren't any files left (they were all cancelled) disable the cancel button
			if (this.getStats().files_queued === 0) {
				document.getElementById(this.customSettings.cancelButtonId).disabled = true;
			}
			progress.setStatus("Cancelled");
			progress.setCancelled();
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.setStatus("Stopped");
			break;
		default:
			progress.setStatus("Unhandled Error: " + errorCode);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		}
	} catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {

    //页面滚动到改图位置
    //var _top = $('body').find("#uploaded_"+file.id).offset().top
    //$('body').animate({scrollTop:_top},1000,"easeInOutQuart")

    //console.log(this.getStats().files_queued ,file,'uploadComplete')
    /*
	if (this.getStats().files_queued === 0) {
		document.getElementById(this.customSettings.cancelButtonId).disabled = true;
	}
    */
    //console.log(this.getStats(),'getStats()')
    /*
    var _queued = this.getStats().files_queued; //队列中的文件数
    var _in_progress = this.getStats().in_progress; //
    var _uploaded = this.getStats().successful_uploads; //上传成功的文件数
    var _errors = this.getStats().upload_errors; //出错文件数
    var _canceled = this.getStats().upload_cancelled; //被取消文件数
    var total_percent = Math.ceil( (_uploaded * 100) / TOTAL_UPLOAD_NUM); //总的上传进度

    //console.log(TOTAL_UPLOAD_NUM,_queued,_uploaded,total_percent,'=== upload complete')
    */
    //$('.total-progress').css('width',total_percent+'%')
    //$('.total-progress-tit').html('上传总进度：'+total_percent+'%')
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
	//var status = document.getElementById("divStatus");
	//status.innerHTML = numFilesUploaded + " file" + (numFilesUploaded === 1 ? "" : "s") + " uploaded.";
    
    TOTAL_UPLOAD_NUM = 0;
    TOTAL_PROGRESS = 0;
    $('.post-button').attr('disabled',false)
    setTimeout(function(){
        $('.total-uploader-progress-box').hide()
        $('.uploader').show()
        $('.total-progress').css('width',0)
        $('.total-progress-tit').html('上传总进度：0%')
    },1500)

}
