$(document).ready(function(){
	var content_wrapper 	= $('.photo-content-wrapper');
	var tools_bar 			= $('.tools-bar');
	var photo_content		= $('.photo-content');
	var photo				= $('.photo-content img.photo');
	var photo_arrow			= $('.photo-previous, .photo-next');
	var photo_prev			= $('.photo-previous');
	var photo_next			= $('.photo-next');
	var photo_list 			= $('.photo-list');
	var photo_msg_box		= $('.photo-view-msg-box');
	var photo_comment_box	= $('.photo-view-comment-box');
	var photo_comment 		= $('.view-comment');
	var photo_loading 		= $('.photo-loading');
	
	var photo_list_mod_wp	= $('.photo-list-mod-wrapper');
	var photo_list_mod_box	= $('.photo-list-mod-box');
	var photo_list_mod_open	= $('.open-photo-list-mod');
	var photo_list_mod_close= $('.close-photo-list-mod');
	
	//保存当前专辑的信息
	window.album_info = {
		id				:	null,	//id
		title			:	null,	//标题
		url				:	null,	//专辑地址
		dec				:	null,	//描述
		fav_nums		:	null,	//被收藏数
		comment_nums	:	null,	//评论数
		status			:	null,	//专辑状态
		uid				:	null,	//发布者uid
	}
	
	//保存当前加载图片的信息
	window.photo_info = {
		width			:	null,	//width
		height			:	null,	//height
		url				:	null,	//url
		id				:	null,	//id
		dec				:	null,	//descraption
		fav_nums		:	null,	//被收藏数
		comment_nums	:	null,	//评论数
		status 			:	null,	//status: loading & loaded
		floor			:	window.location.hash ? parseInt(window.location.hash.split('+')[1]) : 0	//该图片是所在专辑的第几张(通过location.href传递) [0,n]
	}
	
	var album_datas = datas;
	
	
	var view_document_resize = function(){
		var document_w = $(window).width();
		var document_h = $(window).height();
		
		//set content-wrapper
		content_wrapper.css({width: document_w - tools_bar.width()-1});
		content_wrapper.css({height: document_h});
		
		//set tools-bar
		tools_bar.css({height: document_h});
		
		//set photo
		if(photo_info.width >= photo_info.height){
			if(photo_info.width > content_wrapper.width()){
				photo.css( {width: content_wrapper.width()} );
				//alert(111)
			}
			photo.css( 'margin-top',(content_wrapper.height()-photo.height())/2 );
		}else{
			if(photo_info.height >= content_wrapper.height()){
				photo.css({height: content_wrapper.height()});
				photo.css( 'margin-top',0 );
			}
		}
		
		//set .photo-list-mod-wrapper
		photo_list_mod_wp.css({'width':document_w,'height':document_h})
		photo_list_mod_box.css('height',document_h);
		
		//set photo_loading
		photo_loading.css({
			left	:	(content_wrapper.width()-photo_loading.width())/2,
			top		:	(content_wrapper.height()-photo_loading.height())/2
		});
		
		//set .photo-previous & .photo-next btn
		photo_arrow.css({top: (content_wrapper.height()-photo_arrow.height())/2});
		
		//set .photo-list
		photo_list.css({width: photo_content.width()})
		
		//set .photo-view-msg-box
		photo_msg_box.css({
			left	:	(content_wrapper.width()-photo_msg_box.width())/2,
			top		:	(content_wrapper.height()-photo_msg_box.height())/2
		});
		
		//set comment-box
		photo_comment_box.css({
			height	:	content_wrapper.height()
		});
	}
	view_document_resize();
	
	$(window).resize(function(){
		view_document_resize();
	});
	
	//load remote image
	var imgLoad = function (url, callback) {
	    var img = new Image();
	    photo_loading.show();//显示图片加载提示
	    img.src = url;
	    
	    if (img.complete) {
			callback(img.width, img.height);
	    } else {
	        img.onload = function () {
	        	if(img.complete){
	        		photo_loading.hide();//隐藏图片加载提示
	        	}
	            callback(img.width, img.height);
	            img.onload = null;
	        };
	        img.onerror = function(){
	        	//alert('图片有错误，加载失败'+url);
	        	photo_loading.hide();
	        	photo_msg_box.fadeIn()
	        }
	    }
	}
	
	var getImage = function(url){
		photo_msg_box.fadeOut();
		imgLoad( url,
			function(w,h){
				photo_info.width 	= w;
				photo_info.height 	= h;
				photo_info.url 		= url;
				photo.attr('src',url).fadeIn();
				photo.removeAttr('style');//清除上一张图片的样式
				
				if(w >= h){
					if(w > content_wrapper.width()){
						photo.css( {width: content_wrapper.width()} );
					}
					photo.css( 'margin-top',(content_wrapper.height()-photo.height())/2 );
				}else{
					if(h >= content_wrapper.height()){
						photo.css({height: content_wrapper.height()});
						photo.css( 'margin-top',0 );
					}
				}
				photo_loading.hide();
			}
		);
	}//( url[0].url )
	getImage( album_datas.photo[photo_info.floor].url );
	
	//把该专辑的所有图片的缩略图装入phto list
	$.each(album_datas.photo,function(i,n){
		$('.photo-list-loader').remove();
		var curr;
		i==0 ? curr = ' current-view' : ''
		console.log(n.id)
		$('.photo-list-container').append('<div class="photo-list-item '+curr+'"><img src="'+n.s_url+'" pid="'+n.id+'" /></div>')
	})
	$('.photo-list-item').click(function(){
		var pid = parseInt( $(this).find('img').attr('pid') );
		
		$(this).prevAll().removeClass('current-view');
		$(this).nextAll().removeClass('current-view');
		$(this).addClass('current-view');
		
		//load this photo
		getImage( album_datas.photo[pid].url );
	})
	
	
	var reGetCurrentPhoto = function(){
		getImage( album_datas.photo[photo_info.floor].url );
	}
	
	//点击上一个或下一个中某个缩略图后，
	
	
	var toNextPhoto = function(){
		if(photo_info.floor < (album_datas.photo.length-1)){
			var next_floor = photo_info.floor + 1;
			getImage( album_datas.photo[next_floor].url );
			window.location.href = window.location.pathname+'#p+'+next_floor;
			photo_info.floor++;
		}else{
			getImage( album_datas.photo[0].url);
			window.location.href = window.location.pathname+'#p+0';
			photo_info.floor = 0;
		}
	}
	
	var toPrevPhoto = function(){
		photo_info.floor--;
		if(photo_info.floor < 0){
			photo_info.floor = album_datas.photo.length-1;
		}
		getImage( album_datas.photo[photo_info.floor].url );
		window.location.href = window.location.pathname+'#p+'+photo_info.floor;
	}
	
	//展开photo list
	var showPhotoList = function(){
		photo_list.animate({bottom:'0px'},500,'easeInOutQuart',function(){})
	}
	//隐藏photo list
	var hidePhotoList = function(){
		photo_list.animate({bottom:'-300px'},500,'easeInOutQuart',function(){})
	}
	//点击图片后显示photo list
	photo_content.click(function(event){
		var event = event || window.event;
		var e = event.srcElement || event.target;
		var current_click = $(e).attr('class');
		
		if(parseInt(photo_list.css('bottom')) < 0){
			if(current_click == 'photo-previous' || current_click == 'photo-next') null
			else showPhotoList()
		}else{
			hidePhotoList()
		}
	});
	
	//关闭photo list
	$('.close-photo-list').click(function(){
		hidePhotoList()
	})
	
	
	//打开photo-list-mod
	var showPhotoListMod = function(){
		photo_list_mod_wp.show();
	}
	//隐藏 photo-list-mod
	var hidePhotoListMod = function(){
		photo_list_mod_wp.fadeOut();
	}
	
	
	//打开评论
	var showComment = function(){
		photo_comment_box.animate({
			'right' : '0'
		},400,"easeInOutExpo",function(){
			//$('#comment-post').focus();
		});
	}
	
	var hideComment = function(){
		photo_comment_box.animate({
			'right' : '-403px'
		},400,"easeInOutExpo");
	}
	
	
	photo_next.click(function(){
		toNextPhoto()
	});
	
	photo_prev.click(function(){
		toPrevPhoto()
	});
	
	//图片获取失败，重新请求图片
	$('.re-get-image').live('click',function(){
		$('.msg').hide();
		reGetCurrentPhoto();
	});
	
	//key-code
	$(window).keydown(function(e){
		var tag = e.target.tagName.toLowerCase();
		if(!e.target){
			return false;
		}
		
		if(tag == 'input' || tag == 'textarea'){}
		else{
			if (e.keyCode == 37){
				toPrevPhoto()
			}
			else if (e.keyCode==39){
				toNextPhoto()
			}
			else if(e.keyCode==82){
				//alert('R')
				reGetCurrentPhoto()
			}
			else if(e.keyCode==83){
				//alert('S')
				//showPhotoList()
				//showMainMenu()
				showComment()
			}
			else if(e.keyCode==72){
				hidePhotoList()
				hideComment()
			}
			else if(e.keyCode==27){
				alert('close')
			}
		}
	});
	
	$(document).click(function(event){
		var event = event || window.event;
		var e = event.srcElement || event.target;
		var current_click = $(e).attr('class');
		/*
		var main_menu_box = $('.photo-view-main-menu-box');
		var main_menu_btn = $('.photo-view-main-menu-btn');
		
		while(e){
			if(
				//current_click == 'photo-view-main-menu-box'
				$(e).attr('class') == 'photo-view-main-menu-box'
			){
				return;
			}
			e = e.parentNode;
		}
		//alert('close menu')
		var $main_menu = $('.photo-view-main-menu-box');
		$main_menu.removeClass('animate-main-menu')
		$('.photo-view-main-menu-btn').fadeIn();
		*/
	});
	
	//show comment box
	photo_comment.click(function(){
		var s = null;
		if(photo_comment_box.css('right')=='0px'){
			hideComment();
		}else{
			showComment()
		}
		/*photo_comment_box.animate({
			'right' : s
		},400,"easeInOutExpo",function(){
			$('#comment-post').focus();
		});*/
	});
	
	//show-main-menu
	photo_list_mod_open.live('click',function(){
		showPhotoListMod()
	});
	photo_list_mod_close.live('click',function(){
		hidePhotoListMod()
	});
	
	$('.p-l-m-item').hover(
		function(){
			$(this).find('.p-l-m-tool-bar').css({'marginTop': ($(this).height() - 80)/2 + 100 }).fadeIn();
		},
		function(){
			$(this).find('.p-l-m-tool-bar').css({'marginTop': ($(this).height() - 80)/2 + 100 }).hide();
			$(this).find('.p-l-m-comment-box').hide();
		}
	)
	
	$('.comment-this-photo').click(function(){
		comment_box = $(this).parent().next();
		comment_box.css({'height': comment_box.parent().height()-5}).show();
	})
	//-590px
	
	
	
	//tips
	$('.tips-left').tipTip({
		defaultPosition:'left',fadeIn: 600
	});
	$('.tips-right').tipTip({
		defaultPosition:'right',fadeIn: 600
	});
	$('.tips-top').tipTip({
		defaultPosition:'top',fadeIn: 600
	});
	$('.tips-bottom').tipTip({
		defaultPosition:'bottom',fadeIn: 600
	});
});


//依赖jquery
var missilePhoto = function(){
	//alert('1');
}()
