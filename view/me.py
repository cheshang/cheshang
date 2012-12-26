#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
import web
from config import render
from view._base import route, LoginView, NoLoginView, login
from model.album import user_album_latest


@route('/me')
class Me(LoginView):
    def GET(self):
        album_li = user_album_latest(10, 0, self.uid)
        return self.render(album_li=album_li)

@route('/me/settings')
class Settings(LoginView):
    def GET(self):
        return self.render()
