#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
import json
from config import render as _render
from lib.route import Route
from model.user import User
from model.session import session_new, id_by_session, session_rm
from model.template_extend import FUNCTIONS

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
        kargs.update(FUNCTIONS)
        if not template_name:
            template_name = '%s/%s.html' % (
                self.__module__[5:].replace('.', '/').lower(),
                self.__class__.__name__.lower()
            )
        return _render._render(template_name, **kargs)

    def argument(self, name, default=''):
        return web.input().get(name, default).strip()

    def arguments(self, *args):
        data = web.input()
        result = []
        for i in args:
            value = data.get(i, '').strip()
            result.append(value)
        return result

    login = login

class LoginView(View):
    def __init__(self):
        if not self.current_user:
            self.redirect('/signin')

class JsonView(View):
    def render(self, arg):
        web.header('Content-Type', 'application/json; charset=UTF-8')
        return json.dumps(arg)

class JsonLoginView(JsonView):
    def __init__(self):
        if not self.current_user:
            self.render({'login':0})

class NoLoginView(View):
    def __init__(self):
        if self.current_user:
            self.redirect('/me')

   
'''
setcookie(name, value, expires="", domain=None, secure=False): 
web.cookies().get(cookieName) 
foo = web.cookies(cookieName=defaultValue)
foo.cookieName 
'''