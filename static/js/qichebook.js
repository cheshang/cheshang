$(document).ready(function(){
	//首页 document resize
	var document_resize = function(){
		var list_box_w = 500; //$('.album-list-box').css({width:list_box_w});
		var document_w = $(document).width();
		var n = parseInt((document_w - 60) / list_box_w);
		var s = (document_w - n*list_box_w) / 2;
		if(s <= 50){
			if(n>2){
				n = n -1;
			}
		}
		if(n<2){
			n = 2;
		}
		var container_w = list_box_w*n + n*20;
		$('.container-wrapper, .header-container').css({width	: container_w});
		//$('.auth-box ').css({width: container_w - 400});
		if(n>2){
			//$('.auth-box').addClass('auth-box-has-bg');
		}else{
			//$('.auth-box').removeClass('auth-box-has-bg');
		}
	}
	document_resize();
	
	$(window).resize(function(){
		document_resize();
	});
	
	var zoomImg = function(img){
		var img 	= img;
		var w		= img.parent().parent().attr('w');
		var h		= img.parent().parent().attr('h');
		
		if(w==500 && h==350) return;
		if(w >500){
			//左右移动
			var currLeftSize	= parseInt(img.css('margin-left'));
			var moveLeftSize 	= -( (w-500) - Math.abs(currLeftSize) );
			//var leftSpeedSize	= currLeftSize==0 ? 1500 : 3*Math.abs(currTopSize); 
			var leftSpeedSize = 1300;
		
			img.animate({
				'marginLeft': moveLeftSize+'px'
			},leftSpeedSize,function(){
				var s = img.parent().parent().attr('currway','left')
				img.animate({
					'marginLeft': 0
				},leftSpeedSize,function(){
					var s = img.parent().parent().attr('currway','right')
				})
			});
		}else{
			//上下移动
			var currTopSize		= parseInt(img.css('margin-top'));
			var moveTopSize  	= -( (h-350) - Math.abs(currTopSize) );
			//var topSpeedSize	= currTopSize==0 ? 1500 : (30/7)*Math.abs(currTopSize);
			var topSpeedSize = 1300;
			
			img.animate({
				'marginTop': moveTopSize+'px'
			},topSpeedSize,function(){
				var s = img.parent().parent().attr('currway','up')
				img.animate({
					'marginTop': 0
				},topSpeedSize,function(){
					var s = img.parent().parent().attr('currway','down')
				})
			});
		}
	}
	
	//hover index img
	$('.album-cover-img').hover(
		function(){
			//var w 	= $(this).attr('w');
			//var h 	= $(this).attr('h');
			var img = $(this).find('img');
			zoomImg(img)
		},
		function(){
			$(this).find('img').stop()
		}
	);
});
