jQuery.fn.extend(

    ctrl_enter : (callback) ->
        $(this).keydown(
            (event) ->
                event = event.originalEvent;
                if event.keyCode == 13 and (event.metaKey or event.ctrlKey)
                    callback?()
                    false
        )

    click_drop : (drop, callback1, callback2) ->
        html = $("html,body")
        $(@).click (e)->
            self = @
            self.blur()
            
            _ = ->
                drop.hide()
                html.unbind 'click' , _
                callback2 and callback2()
            if drop.is(":hidden")
                drop.show()
                e.stopPropagation()
                html.click(_)
                clicked = true
                callback1 and callback1()
            else
                _()

)

jQuery.extend(
    escape : (txt) -> $('<div/>').text(txt).html()
    html : ->
        # _ = $.html()
        # _ "TEST #{$.escape o.txt}"
        # div.html _.html()
        
        r = []
        _ = (o) -> r.push o
        _.html = -> r.join ''
        _
    uid : ->
         (""+ Math.random()).slice(2)
)
