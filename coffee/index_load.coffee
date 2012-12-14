#
#加载首页数据流
#

if not stream
  stream = $.stream(
     (load_count, data) ->
          "/xxxx/xxx#{load_count+1}"
     (li, has_more)->
          #console.log li
     10
     data_parser
  )
stream()
