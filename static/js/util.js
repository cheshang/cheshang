IE6 = $.browser.msie && $.browser.version < 7 && ! window.XMLHttpRequest


(function(jQuery){
var LOAD_SCRIPT={}

jQuery.extend({
    loadScript : function(url, callback, cache){
        if(LOAD_SCRIPT[url]){
            callback&&callback();
            return
        }
        if(url in LOAD_SCRIPT){
            return
        }

        LOAD_SCRIPT[url]=0
        jQuery.holdReady(false);
        jQuery.ajax({
           type: "GET",
           url: url,
           success: function(){
               jQuery.holdReady(false);
               LOAD_SCRIPT[url] = 1
               callback&&callback();
           },
           dataType: "script",
           cache: cache||true
        })
    },
    isotime : function(timestamp){
        var date = new Date(timestamp*1000),hour=date.getHours(),minute=date.getMinutes();
        if(hour<9){
            hour = "0"+hour
        }
        if(minute<9){
            minute = "0"+minute
        }
        var result = [ date.getMonth() + 1, date.getDate() ], now = new Date(), full_year=date.getFullYear();
        if(now.getFullYear()!=full_year){
            result.unshift(full_year)
        } 
        
        return result.join("-")+" "+[ hour,minute ].join(":") 
    },
    timeago : function(timestamp){
        var date = new Date(timestamp*1000);
        var ago = parseInt((new Date().getTime() - date.getTime())/1000);
        var minute;
        if(ago>-60&&ago<=0){
            return "刚刚"
        }else if(ago<60){
            return ago+"秒前"
        }else{
            minute = parseInt(ago/60)
            if(minute<60){
                return minute+"分钟前"
            }
        }
        return jQuery.isotime(timestamp).split(" ")[0]
    }

})

})(jQuery);




$.fn.extend({
    insert_caret: function(t) {
        var self = this,
        o = self[0];
        if (document.all && o.createTextRange && o.p) {
            var p = o.p;
            p.text = p.text.charAt(p.text.length - 1) == '' ? t + '': t;
        } else if (o.setSelectionRange) {
            var s = o.selectionStart;
            var e = o.selectionEnd;
            var t1 = o.value.substring(0, s);
            var t2 = o.value.substring(e);
            o.value = t1 + t + t2;
            o.focus();
            var len = t.length;
            o.setSelectionRange(s + len, s + len);
            o.blur();
        } else {
            o.value += t;
        }
        self.focus()
    }
})

var _CODESH;
function codesh(){
    if(IE6)return;
    if($(".codebrush")[0]){
        if(_CODESH){
            SyntaxHighlighter.highlight();
        }else{
            $.ajax({
                url: "http://0.42qu.us/SyntaxHighlighter/sh.js",
                dataType: "script",
                cache: true
            })
            _CODESH=1
        }
    }
}

function $id(id){
    return document.getElementById(id)
}
