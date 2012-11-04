jQuery.extend({
     checkAuthForm : function(form, callback) {
     	form = form || $($('form')[0])
        if ( jQuery.isFunction( form ) ) {
            callback = form;
            //form = $($('form')[0]);
        }
        form.find('type[=submit]').bind('click',function(){
        	alert(123);
        	return false;
        })
        
        $.each(form.find('input'),function(o){
        	console.log($(this).attr('type'))
        })
        
        
    },
    
    checkPostForm : function(form, callback){
    	//TODO
    	var hash = jQuery.cookie.get("_hash_")
    }
})

