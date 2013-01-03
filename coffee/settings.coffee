
one_settings =
    btnid : "upload-avatar"
    start : (file)->
        console.log file,'start'

    error: (file,code,msg)->
    success : (file,serverData)->
        console.log file,serverData,'succ callback'
        o = JSON.parse(serverData)
        src = 'http://'+UPYUN[3]+s.url+'!1'
        console.log o,src,'==='

one_uploader one_settings
