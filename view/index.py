#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
import web
#from config import render
from view._base import route, LoginView, View, NoLoginView
#from lib.base import login as _login

@route('/')
class Index(View):
    def GET(self):
        return self.render()

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
