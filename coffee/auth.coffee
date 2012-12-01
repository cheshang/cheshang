error_text = (self, o) ->
    $(self).parent().find('span').html(o)

$('#auth-mail').blur ->
    $.postJSON('/j/email/verify', 'email': $('#auth-mail').val(), (o)->
        error_text(@, o)
    )

$('#auth-passwd').blur ->
    if $('#auth-mail').val().length < 6
        error_text(@, '密码至少需要6位')
    else
        error_text(@, '')

$('#auth-passwd1').blur ->
    if $(@).val() != $('#auth-passwd').val()
        error_text(@, '两次密码输入不一致')
    else
        error_text(@, '')

#$('#auth-submit').submit ->
