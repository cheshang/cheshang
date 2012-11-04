#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render
from view._base import route, LoginView, NoLoginView

@route('/signup')
class Signup(NoLoginView):
    def GET(self):
        return self.render()

    def POST(self):
        email, passwd, name =  self.argument('email', 'passwd', 'name')
        if email and passwd and name:
            account_new(email, passwd, name) 
        return self.render()


@route('/signin')
class Signin(NoLoginView):
    def GET(self):
        return self.render()

    def POST(self):
        print self.argument('u')
        print self.argument('p')
        return 1
