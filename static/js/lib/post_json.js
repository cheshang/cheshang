jQuery.extend({
     postJSON : function(url, data, callback) {
        data = data||{};
        if ( jQuery.isFunction( data ) ) {
            callback = data;
        }
        //var _xsrf = $.cookie.get("_xsrf");
        //if(typeof data=="string"){
        //    data+="&_xsrf="+_xsrf
        //}else{
        //    data._xsrf = _xsrf;
        //}
        jQuery.ajax({
            url: url,
            data: data,
            dataType: "json",
            type: "POST",
            success: function(data, textStatus, jqXHR){
                if(data&&data.login){
                    login()
                }else if(callback){
                    callback(data, textStatus, jqXHR)
                }
            }
        });
    }
})
