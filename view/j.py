#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render
from view._base import route, JsonView, JsonLoginView
from model.album import album_new
from model.email import uid_by_email
from lib.utils import RE_EMAIL

@route('/j/email/verify')
class email_exists(JsonView):
    def POST(self):
        email = self.argument('email')
        if not RE_EMAIL.match(email):
            return self.render('邮箱格式不正确')
        if uid_by_email(email):
            return self.render('邮箱已被注册')
        else:
            return self.render('ok')

    GET = POST


@route('/j/catagory/new')
class cata_new(JsonLoginView):
    def POST(self):
        user_id = self.current_user_id
        name = self.argument('name')
        if name:
            album_new(name, user_id)
        return self.render(1)


@route('/comment/(\d+)')
class Comment(JsonLoginView):
    def GET(self, id=0):
        return id
