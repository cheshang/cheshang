#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render, WEIBO_KEY, WEIBO_SECRET
from view._base import route, View, LoginView, NoLoginView
from lib.weibo import APIClient
from model.account import account_new, oauth2_account_new
from model.email import uid_by_email
from model.passwd import passwd_verify
from model.oauth2 import Oauth2

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
        if passwd_verify(uid, p):
            self.login(uid)
        return self.render()

@route('/callback/(\w+)')
class Callback(View):
    def GET(self, auth_type):
        code = self.argument('code')
        if auth_type in ['weibo']:
            CALLBACK_URL = 'http://ldev.cn/callback/%s' % auth_type
            client = APIClient(app_key=WEIBO_KEY, app_secret=WEIBO_SECRET, redirect_uri=CALLBACK_URL)
            r = client.request_access_token(code)
            print r.uid
            uid = oauth2_account_new(auth_type, r.uid)
            print uid
            oauth = Oauth2(self.current_user_id, auth_type)

            print r, type(r)
            access_token = r.access_token # 新浪返回的token
            expires_in = r.expires_in # token过期的UNIX时间：
            oauth.code_save(code)
            print expires_in
            # TODO: 在此可保存access token
            client.set_access_token(access_token, expires_in)

@route('/auth/weibo')
class Weibo(View):
    def GET(self):
        CALLBACK_URL = 'http://ldev.cn/callback/weibo'
        client = APIClient(app_key=WEIBO_KEY, app_secret=WEIBO_SECRET, redirect_uri=CALLBACK_URL)
        url = client.get_authorize_url()
        self.redirect(url)