#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
import web
from view._base import route, LoginView, View, NoLoginView
from model.album import album_latest

@route('/')
class Index(View):
    def GET(self):
        album_li = album_latest(10, 0)
        return self.render(album_li=album_li)

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
