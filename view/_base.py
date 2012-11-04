#!/usr/bin/python
# -*- coding: utf-8 -*-
import web
from config import render as _render
from lib.route import Route
from lib.session import session_new, id_by_session, session_rm

route = Route()

def logout(self, uid):
    s = web.cookies().get('S')
    session_rm(s)
    web.setcookie('S', '')

class View(object):

    @property
    def login(self):
        s = web.cookies().get('S')
        uid = id_by_session(s)
        return True if uid else False

    def redirect(self, url):
        raise web.seeother(url)

    def render(self, template_name=None, **kargs):
        if not template_name:
            template_name = '%s/%s.html' % (
                self.__module__[5:].replace('.', '/'),
                self.__class__.__name__
            )
        return _render._render(template_name)
        return template_name

class LoginView(View):
    def __init__(self):
        s = web.cookies().get('S')
        uid = session_get(s)
        if uid:
            self.uid = uid
        else:
            self.redirect('/login')

class NoLoginView(View):
    def __init__(self):
        super(NoLoginView, self).__init__()
        if self.login:
            self.redirect('/')

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
