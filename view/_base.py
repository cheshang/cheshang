#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render as _render
from lib.route import Route
from model.session import session_new, id_by_session, session_rm
from model.user import User

route = Route()

def logout(self, uid):
    s = web.cookies().get('S')
    session_rm(s)
    web.setcookie('S', '')

def login(self, uid):
    web.setcookie('S', session_new(uid))

class View(object):
    @property
    def current_user_id(self):
        s = web.cookies().get('S')
        return id_by_session(s)


    def redirect(self, url):
        raise web.seeother(url)

    @property
    def current_user(self):
        uid = self.current_user_id
        return User(uid) if uid else None


    def render(self, template_name=None, **kargs):
        kargs['current_user_id'] = self.current_user_id
        kargs['current_user'] = self.current_user
        if not template_name:
            template_name = '%s/%s.html' % (
                self.__module__[5:].replace('.', '/').lower(),
                self.__class__.__name__.lower()
            )
        return _render._render(template_name, **kargs)

    def argument(self, name, default=''):
        return web.input().get(name, default)

    def arguments(self, *args):
        data = web.input()
        result = []
        for i in args:
            value = data.get(i, '')
            result.append(value)
        return result

    login = login

class LoginView(View):
    def __init__(self):
        if not self.current_user:
            self.redirect('/signin')

class NoLoginView(View):
    def __init__(self):
        if self.current_user:
            self.redirect('/me')

def my_loadhook():
    print "my load hook"

    def my_unloadhook():
        print "my unload hook"

        app.add_processor(web.loadhook(my_loadhook))
        app.add_processor(web.unloadhook(my_unloadhook))
    

'''
setcookie(name, value, expires="", domain=None, secure=False): 
web.cookies().get(cookieName) 
foo = web.cookies(cookieName=defaultValue)
foo.cookieName 
'''
