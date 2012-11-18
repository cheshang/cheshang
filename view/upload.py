#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
#from config import render
from view._base import route, LoginView, View, NoLoginView
#from lib.base import login as _login

@route('/upload')
class Upload(View):
    def GET(self):
        return self.render()

