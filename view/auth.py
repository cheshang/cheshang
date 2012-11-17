#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render, WEIBO_KEY, WEIBO_SECRET
from view._base import route, View, LoginView, NoLoginView
from lib.weibo import APIClient
from model.account import account_new
from model.email import uid_by_email
from model.passwd import passwd_verify
from model.oauth2 import oauth2_new, uid_by_oauth
from model.profile import profile_new

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
        return self.redirect('/me')

@route('/callback/(\w+)')
class Callback(View):
    def GET(self, auth_type):
        code = self.argument('code')
        if auth_type in ['weibo']:
            CALLBACK_URL = 'http://ldev.cn/callback/%s' % auth_type
            client = APIClient(app_key=WEIBO_KEY, app_secret=WEIBO_SECRET, redirect_uri=CALLBACK_URL)
            r = client.request_access_token(code)
            access_token = r.access_token # 新浪返回的token
            expires_in = r.expires_in # token过期的UNIX时间：            
            uid = uid_by_oauth(r.uid, auth_type)
            if not uid:
                uid = oauth2_new(oauth_type=auth_type, oauth_id=r.uid, code=code, \
                    token=access_token, expires_in=expires_in)

                # TODO: 在此可保存access token
                client.set_access_token(access_token, expires_in)
                #print client.statuses.user_timeline.get()

                info = client.users.show.get(uid=r.uid)
                print info
                #profile_new(uid, 
                #    name = info['screen_name'],
                #    motto = info['description'],
                #    avatar = info['avatar_large'],
                #    gender = info['gender'])
            self.login(uid)
            self.redirect('/me')

@route('/oauth/weibo')
class Weibo(View):
    def GET(self):
        CALLBACK_URL = 'http://ldev.cn/callback/weibo'
        client = APIClient(app_key=WEIBO_KEY, app_secret=WEIBO_SECRET, redirect_uri=CALLBACK_URL)
        url = client.get_authorize_url()
        self.redirect(url)