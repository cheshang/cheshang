#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render
from view._base import route, LoginView, NoLoginView, login
from model.account import account_new
from model.email import uid_by_email
from model.passwd import passwd_verify

@route('/signup')
class Signup(NoLoginView):
    def GET(self):
        return self.render()

    def POST(self):
        email, passwd, name =  self.arguments('email', 'passwd', 'name')
        if email and passwd:
            id = account_new(email, passwd, name) 
            print id
        return self.render()


@route('/signin')
class Signin(NoLoginView):
    def GET(self):
        return self.render()

    def POST(self):
        u = self.argument('u')
        p = self.argument('p')
        uid = uid_by_email(u)
        print uid, 'uidddddddddddddddd'
        print p
        if passwd_verify(uid, p):
            print '111111111111111111111'
            self.login(uid)
        print '22222222222'
        return self.render()

