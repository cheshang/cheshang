
var timenow = new Date().getTime();

//In.add('reset_css',{path:'/static/css/reset.css'});
//In.add('cheshang_css',{path:'/static/css/cheshang.css'});

In.add('tips_css',{path:'/static/js/tips/tiptip.css'});
In.add('bootstrap_css',{path:'/static/css/bootstrap.min.css'});
In.add('progress_css',{path:'/static/css/progress.css'});

In.add('cheshang',{ path:'/static/js/cheshang.js?'+timenow,type:'js',charset:'utf-8' });
In.add('lazyload',{ path:'/static/js/jquery.lazyload.js',type:'js',charset:'utf-8'});
In.add('easing',{ path:'/static/js/jquery.easing.1.3.js',type:'js',charset:'utf-8' });
In.add('tmpl',{ path:'/static/js/jquery.tmpl.min.js',type:'js',charset:'utf-8' });
In.add('scroll',{ path:'/static/js/jquery.scrollTo-1.4.3.1-min.js',type:'js',charset:'utf-8' });

In.add('suffix',{ path:'/static/js/lib/suffix.js',type:'js',charset:'utf-8'});
In.add('view',{ path:'/static/js/view.js?'+timenow,type:'js',charset:'utf-8',rely:['easing','tips']});
In.add('share',{ path:'/static/js/lib/share.js',type:'js',charset:'utf-8' });
In.add('tips',{ path:'/static/js/tips/jquery.tiptip.js',type:'js',charset:'utf-8',rely:['tips_css']});

In.add('postjson',{ path:'/static/js/lib/post_json.js',type:'js',charset:'utf-8'});

In.add('auth',{ path:'/static/js/auth.js',type:'js',charset:'utf-8'});
In.add('settings',{ path:'/static/js/settings.js',type:'js',charset:'utf-8',rely:['one_uploader']});

In.add('swf_lib',{ path:'/static/js/swfupload/swfupload.js',type:'js',charset:'utf-8'});
In.add('swf_queue',{ path:'/static/js/swfupload/swfupload.queue.js',type:'js',charset:'utf-8'});
In.add('swf_progress',{ path:'/static/js/swfupload/fileprogress.js',type:'js',charset:'utf-8'});
In.add('swf_handlers',{ path:'/static/js/swfupload/handlers.js',type:'js',charset:'utf-8'});
In.add('swf_uploader',{ path:'/static/js/uploader.js',type:'js',charset:'utf-8',rely:['swf_lib','swf_queue','swf_progress','swf_handlers']});
In.add('one_uploader',{ path:'/static/js/one_uploader.js',type:'js',charset:'utf-8',rely:['swf_lib']});

In.add('new_album',{ path:'/static/js/new_album.js',type:'js',charset:'utf-8'});

In.add('masonry',{ path:'/static/js/jquery.masonry.min.js',type:'js',charset:'utf-8'});

