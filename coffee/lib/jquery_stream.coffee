
#stream 是用于从数据源无限加载内容的函数 , 封装了无限加载的网络接口 , 方便使用者

#stream : (next_url, render, page_size, data_parser , buffer_size) ->

#   next_url 函数, 返回入口的网址, 接受2个参数:
#   load_count 为第几次加载 , 第一次加载为0
#   data 上次加载返回的数据 , 第一次加载为null

#   render 渲染函数 , 接受数据的列表 和 是否有更多

#   page_size render的列表有多少条

#   data_parser 数据格式化函数 , 可选 , 返回传给render的数组

#   buffer_size 设置数据缓存池的大小 , 默认值为page_size的5倍

#使用方式
# if not stream
#   stream = $.stream(
#      (load_count, data) ->
#           "/xxxx/xxx#{load_count+1}"
#      (li, has_more)->
#           #console.log li
#      10
#      data_parser
#   )
# stream()

jQuery.extend(
    stream : (next_url, render, page_size, data_parser,buffer_size) ->
        buffer = []
        buffer_size = buffer_size or page_size*5
        has_more = true
        is_loading = false
        load_count = 0
        data = null

        _loader = ()->
            if is_loading or not has_more
                return
            is_loading = true
            url = next_url(load_count, data)
            data = null
            $.getJSON(
                url
                (o)->
                    if data_parser
                        o = data_parser(o)
                        #console.log url , data_parser, o, o.length
                    if not o.length
                        has_more = is_loading = false
                    else
                        data = o
                        buffer.push o...
                        load_count += 1
                        is_loading = false
                    _render()
            )

        _render = ->
            buffer_length = buffer.length
            if buffer_length < page_size and has_more
                _loader()
            else if buffer.length
                o = buffer[0..page_size-1]
                buffer = buffer[page_size..]
                render(o, has_more)
                if (buffer.length < buffer_size) and has_more
                    _loader()


        return _render
)
