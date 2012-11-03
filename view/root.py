#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render
from view._base import route, LoginView, View, NoLoginView
from lib.base import login as _login
from model.main import img_list

@route('/')
class Index:
    def GET(self, url=''):
        return render.index()

@route('/album')
class Album:
    def GET(self, url=''):
        return render.album()

@route('/view')
class ViewPage:
    def GET(self, url=''):
        return render.view()

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
