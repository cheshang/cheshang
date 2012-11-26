/* Demo Note:  This demo uses a FileProgress class that handles the UI for displaying the file name and percent complete.
The FileProgress class is not part of SWFUpload.
*/


/* **********************
   Event Handlers
   These are my custom event handlers to make my
   web application behave the way I went when SWFUpload
   completes different tasks.  These aren't part of the SWFUpload
   package.  They are part of my application.  Without these none
   of the actions SWFUpload makes will show up in my application.
   ********************** */


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

            //$('#uploader').hide();
            //$('#total-progress').show();

            TOTAL_UPLOAD_NUM = numFilesSelected;

		    this.startUpload();
		}
		/* I want auto start the upload and I can do that here */


	} catch (ex)  {
        this.debug(ex);
	}
}

function uploadStart(file) {
	try {
		/* I don't want to do any file validation or anything,  I'll just update the UI and
		return true to indicate that the upload should start.
		It's important to update the UI here because in Linux no uploadProgress events are called. The best
		we can do is say we are uploading.
		 */


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

        //$('.total-progress').css('width',percent+'%')

		var progress = new FileProgress(file, this.customSettings.progressTarget);
		progress.setProgress(percent);
		progress.setStatus("Uploading...");
        
	} catch (ex) {
		this.debug(ex);
	}
}

function uploadSuccess(file, serverData) {
    //console.log(file,'file')
    //console.log(serverData,'serverData')
	try {
		var progress = new FileProgress(file, this.customSettings.progressTarget);
        var s = JSON.parse(serverData)
        //console.log(s,'ssssss')
		progress.setComplete();
		progress.setStatus("Complete.");
		progress.toggleCancel(false);

        var src = 'http://'+UPYUN[3]+s.url+'!1'
        //把上传成功的图片渲染到页面
        var tpl = '<div class="uploader-photo-list" id=uploaded_"'+file.id+'">'+
                '<div class="uploader-photo-imgbox">'+
                    '<img src="'+src+'" />'+
                '</div>'+
                '<div class="uploader-photo-dec">'+
                    '<textarea name="img_dec'+file.id+'" placeholder="图片描述"></textarea>'+
                    '<input type="hidden" name="img_url_'+file.id+'" value="'+s.url+'" />'+
                    '<input type="hidden" name="img_width_'+file.id+'" value="'+s['image-width']+'" />'+
                    '<input type="hidden" name="img_height_'+file.id+'" value="'+s['image-height']+'" />'+
                '</div>'+
                '<div class="uploader-photo-tools">'+
                    '<span class="photo-delete"></span>'+
                '</div>'+
                ''+
            '</div>';
        $('#'+file.id).replaceWith(tpl)

	} catch (ex) {
		this.debug(ex);
	}
}

function uploadError(file, errorCode, message) {
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
	//if (this.getStats().files_queued === 0) {
	//	document.getElementById(this.customSettings.cancelButtonId).disabled = true;
	//}
    //console.log(this.getStats(),'getStats()')
    var _queued = this.getStats().files_queued; //队列中的文件数
    var _in_progress = this.getStats().in_progress; //
    var _uploaded = this.getStats().successful_uploads; //上传成功的文件数
    var _errors = this.getStats().upload_errors; //出错文件数
    var _canceled = this.getStats().upload_cancelled; //被取消文件数
    var total_percent = Math.ceil( (_uploaded * 100) / TOTAL_UPLOAD_NUM); //总的上传进度

    //console.log(TOTAL_UPLOAD_NUM,_queued,_uploaded,total_percent,'=== upload complete')

    $('.total-progress').css('width',total_percent+'%')
    $('.total-progress-tit').html('上传总进度：'+total_percent+'%')
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
	//var status = document.getElementById("divStatus");
	//status.innerHTML = numFilesUploaded + " file" + (numFilesUploaded === 1 ? "" : "s") + " uploaded.";

    setTimeout(function(){
        $('.total-uploader-progress-box').hide()
        $('.uploader').show()
    },2000)

}
