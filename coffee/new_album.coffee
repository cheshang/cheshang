
define_str = "选择已有专辑"

select_btn   = $(".album-select-btn")
album_select_wrapper = $(".album-select-wrapper")
album_box = $(".album-select-box")
album_li = $(".album-select-li")
uploader_header = $(".uploader-header")
select_exists = $(".select-exists-album")

reset_album_new_box = ->

    #album_box = $(".album-select-box")
    #select_btn   = $(".album-select-btn")
    if album_box.height() > 307
        album_box.css
            'height' : 307
            'overflow-y' : 'auto'

    album_box.css
        left : select_btn.offset().left
        top  : select_btn.offset().top + 50


select_btn.click ->

    if album_box.is ':visible'
        album_box.hide()
    else
        reset_album_new_box()
        album_box.fadeIn()


album_li.click ->

    self = $(@)
    album_id = self.data 'id'
    select_btn.find('span').text self.find('span').text()
    $('input[name=name]').val self.find('span').text()
    $("input[name=album_id]").val album_id
    self.parent().hide()

    album_select_wrapper.slideDown ->
        $(@).hide()
        uploader_header.show()


select_exists.click ->
    album_select_wrapper.fadeIn()
    


$( ->
    $(window).resize ->
        reset_album_new_box()
)
