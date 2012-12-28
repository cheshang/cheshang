/*
 * base.class
 */

var ICHESHANG = function(){}

//图片查看
ICHESHANG.prototype.photoView = function(DATAS){

    DATAS = DATAS || window.DATAS

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
    var photo_end_box       = $('.photo-end-recommend');
	
	var photo_list_mod_wp	= $('.photo-list-mod-wrapper');
	var photo_list_mod_box	= $('.photo-list-mod-box');
	var photo_list_mod_open	= $('.open-photo-list-mod');
	var photo_list_mod_close= $('.close-photo-list-mod');
    var photo_list_mod_top  = $('.photo-list-mod-backtop');
	
	var album_datas = DATAS;
	
	//保存当前专辑的信息
	window.album_info = {
		id				:	null,	//id
		title			:	null,	//标题
		url				:	null,	//专辑地址
		dec				:	null,	//描述
		fav_nums		:	null,	//被收藏数
		comment_nums	:	null,	//评论数
		uid				:	null,	//发布者uid
	}
	
	//保存当前加载图片的信息
    var default_pid = window.location.hash ? parseInt(window.location.hash.split('+')[1]) : album_datas.photo[0].id;
	window.photo_info = {
		width			:	null,	//width
		height			:	null,	//height
		url				:	null,	//url
		id				:	default_pid,	//id
		dec				:	null,	//descraption
		fav_nums		:	null,	//被收藏数
		comment_nums	:	null,	//评论数
	}
	
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

        //set photo_end_box
        photo_end_box.css({
			left	:	(content_wrapper.width()-photo_end_box.width())/2,
			top		:	(content_wrapper.height()-photo_end_box.height())/2
        })
		
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
	

    //根据图片的ID获取图片的信息 return object
    //如果图片不在专辑中，则返回false
    window.getPhotoById = function(id){
        console.log(id,'getting photo id')
        _photo = album_datas.photo
        _p_length = _photo.length
        for(i=0;i<_p_length;i++){
            img = _photo[i]
            if(_photo[i].id == id){
                return _photo[i]
            }else{
                if(i==_p_length-1){
                    //return 'not in album'
                    return false
                }
            }
        }
    }

    //根据当前Pid获取下一张图片的信息
    window.getNextPhotoByCurrentId = function(id){
        _photo = album_datas.photo
        _p_length = _photo.length
        for(i=0;i<_p_length;i++){
            if(_photo[i].id == id){
                if(i==_p_length-1){
                    return _photo[0]
                }else{
                    return _photo[i+1]
                }
            }
        }
    }

    //预加载一张图片
    window.preLoadNextPhotoByCurrentId = function(id){
        console.log(id,'curr id')
        var p = getNextPhotoByCurrentId(id)
        getImage(p.url)
    }

    //根据当前Pid获取上一张图片的信息
    window.getPrevPhotoByCurrentId = function(id){
        _photo = album_datas.photo
        _p_length = _photo.length
        for(i=0;i<_p_length;i++){
            if(_photo[i].id == id){
                if(i==0){
                    return _photo[_p_length-1]
                }else{
                    return _photo[i-1]
                }
            }
        }
    }

    //判断当前图片是否是专辑里最后一张
    window.isLastPhoto = function(id){
        _photo = album_datas.photo
        _total = _photo.length
        //_photo.reverse()
        _last_id = _photo[_total-1].id
        if( parseInt(_last_id) == parseInt(id) ){
            return true
        }else{
            return false
        }
    }

    //判断当前图片是否是专辑第一张图片
    window.isFirstPhoto = function(id){
        _photo = album_datas.photo
        if( parseInt(_photo[0].id) == parseInt(id) ){
            return true
        }else{
            return false
        }
    }

	//把该专辑的所有图片的缩略图装入phto list
    window.loadPhotosToListBox = function(){
        _length = $('.photo-list-container').find('.photo-list-item').length
        if(_length > 0){
            //如果缩略图已经加载过则不重复加载，只刷新缩略图当前标示
            _plist = $('.photo-list-container .photo-list-item')
            _plist.removeClass('current-view')
            _plist.each(function(){
                _pid = $(this).attr('pid')
                if(_pid == photo_info.id){
                    $(this).addClass('current-view')
                }
            })
            return
        }
        //装载缩略图
        $.each(album_datas.photo, function(i,n){
            if(n){
                var curr = (n.id == photo_info.id) ? ' current-view' : ''
                $('.photo-list-loader').remove();
                $('.photo-list-container').append('<div class="photo-list-item '+curr+'" pid="'+n.id+'"><img src="'+n.url1+'" /></div>');
            }
        })
    }

    //重置当前图片的数据
    resetPhotoInfoData = function(o){
        photo_info.id           = o.id;
        //photo_info.width        = o.width;
        //photo_info.height       = o.height;
        photo_info.url          = o.url;
        photo_info.dec          = o.dec || '';
        photo_info.comment_nums = o.comment_nums;
        photo_info.fav_nums     = o.fav_nums;
        window.location.href = window.location.pathname+'#p+'+o.id;
        
        //刷新缩略图列表
        loadPhotosToListBox()
        
        //刷新分享按钮数据
        //refreshShareData()
        var _title,_img;
        if(photo_info.dec==''){
            _title = album_datas.title
        }else{
            _title = photo_info.dec
        }
        _img = photo_info.url
        _suffix = " - 车尚-高品质汽车图片社区"
        $('.share-list').attr('data-img',_img)
        $('.share-list').attr('data-title',_title+_suffix)
    }
	

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
	
	var getImage = function(url,callback){
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
                
                if(callback){
                    callback()
                }
			}
		);
	}//( url[0].url )

    curr_img = getPhotoById(photo_info.id)
    if(!curr_img){
        //如果当前图片不存在，则读取专辑第一张图片
        curr_img = album_datas.photo[0]
    }
    getImage( curr_img.url );
    resetPhotoInfoData(curr_img)
	
	$('.photo-list-item').live('click',function(){
		var pid = parseInt( $(this).attr('pid') );
		
		$(this).prevAll().removeClass('current-view');
		$(this).nextAll().removeClass('current-view');
		$(this).addClass('current-view');
		
		//load this photo
        img = getPhotoById(pid)
		getImage( img.url );
        resetPhotoInfoData(img)
	})
	
	
	var reGetCurrentPhoto = function(){
        getImage( getPhotoById(photo_info.id).url )
	}
	
	var toNextPhoto = function(){
        //如果是最后一张图片则弹出提示框(也就是说，下一张是专辑第一张图片)
        var img = getNextPhotoByCurrentId( photo_info.id )
        isFirst = isFirstPhoto(img.id)
        if( isFirst ){
            photo_end_box.show()
            return
        }else{
            photo_end_box.hide()
        }

        getImage( img.url, function(){
            resetPhotoInfoData(img)

            //预加载下一张图片
            //imgLoad( getNextPhotoByCurrentId(img.id).url )
        });

        console.log(photo_info.id,'getting photo id[next]')
	}
	
	var toPrevPhoto = function(){
        photo_end_box.hide()//如果专辑末尾的弹出提示框可见则隐藏掉
        var img = getPrevPhotoByCurrentId( photo_info.id )
        getImage( img.url);
        resetPhotoInfoData(img)
	}
    
    //再看一遍专辑
    $('.photo-end-restart').click(function(){
        var img = getNextPhotoByCurrentId( photo_info.id )
        getImage( img.url);
        resetPhotoInfoData(img)
        photo_end_box.hide()
    })
    $('.photo-end-close').click(function(){
        photo_end_box.hide()
    })
	
	//展开photo list
	var showPhotoList = function(){
		photo_list.animate({bottom:'0px'},500,'easeInOutQuart',function(){})
        loadPhotosToListBox()
	}

	//隐藏photo list
	var hidePhotoList = function(){
		photo_list.animate({bottom:'-300px'},500,'easeInOutQuart',function(){})
	}

	//点击图片后显示photo list
	photo_content.find('img.photo').click(function(event){
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
	
	//打开photo-list-mod [列表模式]
	var showPhotoListMod = function(){
        _content = $('.photo-list-mod-content')
        _plist_box = _content.find('.p-l-m-item')
        if($(_plist_box[0]).find('img').length == 0){
            _plist_box.each(function(i){
                if(i+1 > 3) return false
                self = $(this)
                self.hide()
                src = self.attr('src')
                self.prepend('<img src="'+src+'" />')
                self.find('.photo-list-comment-box').show()
            })
            setTimeout(function(){
                _plist_box.show()
                _content.css('background','none')
            },1400)
        }
		photo_list_mod_wp.show();
	}
	//隐藏 photo-list-mod
	var hidePhotoListMod = function(){
		photo_list_mod_wp.fadeOut();
	}

    //list模式下滚动鼠标滚轮时动态加载列表图片
    $('.photo-list-mod-content').scroll(function(){
        o = $('.photo-list-mod-content').find('.p-l-m-item')
        t = $(this).scrollTop()
        if(t > ( $('.photo-list-mod-for-getheight').height()-900 )){
            var k = 1
            o.each(function(i){
                if(k > 3) return false
                self = $(this)
                if(self.find('img').length == 0){
                    src = self.attr('src')
                    self.prepend('<img src="'+src+'" />')
                    self.find('.photo-list-comment-box').show()
                    k++
                }
            })
        }
    })

    //列表模式下收藏某图片
    $('.p-l-count-fav').live('click',function(){
        var self = $(this)
        var pid = self.attr('pid')
        self.find('span').addClass('faved')
    })
	
    //列表模式下打开某图片的评论
    $('.p-l-count-comment').live('click',function(){
        var self = $(this)
        var pid = self.attr('pid')
        //alert(self.attr('pid'))
        var comment_box = $('#p-l-c-box-'+pid)
        if(comment_box.css('display')=='none'){
            //展开
            comment_box.slideDown()
        }else{
            //关闭
            comment_box.slideUp()
        }
    })
	
	
	//打开评论
	var showComment = function(){
        photo_comment_box.show()
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
                photo_end_box.hide()
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
    photo_list_mod_top.live('click',function(){
        $('.photo-list-mod-content').animate({scrollTop:0},300,"easeInOutQuart")
    })
	
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
}
