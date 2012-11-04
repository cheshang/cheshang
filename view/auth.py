#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render
from view._base import route, LoginView, NoLoginView

@route('/signup')
class Signup(NoLoginView):
    def GET(self, id=0):
        return self.render()
        #return a 
        #return render.register()

