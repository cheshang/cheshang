#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render
from view._base import route, LoginView, NoLoginView, login


@route('/me')
class Me(LoginView):
    def GET(self):
        return self.render()

@route('/me/settings')
class Settings(LoginView):
    def GET(self):
        return self.render()
