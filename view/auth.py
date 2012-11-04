#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render
from view._base import route, LoginView, NoLoginView

@route('/signup')
class Register(NoLoginView):
    def GET(self, id=0):
        self.render()
        #return render.register()

