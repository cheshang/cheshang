#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
import web
from view._base import route, LoginView, View, NoLoginView
from model.album import album_latest, album_count
from lib.page import page_limit_offset

@route('/')
@route('/list/(\d+)')
class Index(View):
    def GET(self, n=1):
        count = album_count()
        page, limit, offset = page_limit_offset('/list/%s', count, n, 4)
        album_li = album_latest(limit, offset)
        return self.render(album_li=album_li, page=page)

@route('/album')
class Album(View):
    def GET(self):
        return self.render()

@route('/view')
class View_Page(View):
    def GET(self, url=''):
        return self.render()

@route('/login')
class Login(NoLoginView):
    def GET(self):
        return render.login()

    def POST(self):
        u =  web.input().u
        p = web.input().p
        if u and p:
            _login(123)
            raise web.redirect('/comment/222')
