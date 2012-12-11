/** 分享按钮 **/
(function(){
    window.SocialShareButton = {
        openUrl: function(url) {
            window.open(url);
            return false
        },
        share: function(b) {
            var f, a, c;
            f = $(b).attr("data-site");
            //a = encodeURIComponent($(b).parent().data("title").replace("|SUB|", $(b).data("substitute")));
            //b = encodeURIComponent($(b).parent().data("img"));
            a = encodeURIComponent($(b).parent().attr("data-title").replace("|SUB|", $(b).data("substitute")));
            b = encodeURIComponent($(b).parent().attr("data-img"));
            c = encodeURIComponent(location.href);
            switch (f) {
            case "weibo":
                SocialShareButton.openUrl("http://v.t.sina.com.cn/share/share.php?url=" + c + "&pic=" + b + "&title=" + a + "&content=utf-8");
                break;
            case "twitter":
                SocialShareButton.openUrl("https://twitter.com/home?status=" + a + ": " + c);
                break;
            case "douban":
                SocialShareButton.openUrl("http://www.douban.com/recommend/?url=" + c + "&title=" + a + "&image=" + b);
                break;
            case "facebook":
                SocialShareButton.openUrl("http://www.facebook.com/sharer.php?t=" + a + "&u=" + c);
                break;
            case "qq":
                SocialShareButton.openUrl("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + c + "&title=" + a + "&pics=" + b);
                break;
            case "tqq":
                SocialShareButton.openUrl("http://share.v.t.qq.com/index.php?c=share&a=index&url=" + c + "&title=" + a + "&pic=" + b);
                break;
            case "baidu":
                SocialShareButton.openUrl("http://apps.hi.baidu.com/share/?url=" + c + "&title=" + a + "&content=");
                break;
            case "kaixin001":
                SocialShareButton.openUrl("http://www.kaixin001.com/rest/records.php?url=" + c + "&content=" + a + "&style=11&pic=" + b);
                break;
            case "renren":
                SocialShareButton.openUrl("http://widget.renren.com/dialog/share?resourceUrl=" + c + "&title=" + a + "&description=");
                break;
            case "google_plus":
                SocialShareButton.openUrl("https://plus.google.com/share?url=" + c + "&t=" + a)
            }
            return false
        }
    }
}).call(this);
