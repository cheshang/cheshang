#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model.db import Model
from model.account import uid_new

OAUTH_TYPE = {
    'weibo' : 1,
    'renren': 2,
} 

class Oauth2(Model):
    pass

def oauth2_new(**kwargs):
    #oauth_type, oauth_id, code, token, expires_in
    kwargs['oauth_type'] = OAUTH_TYPE[kwargs['oauth_type']]
    oauth_id, oauth_type = kwargs['oauth_id'], kwargs['oauth_type']
    oauth = Oauth2.get(oauth_id=oauth_id, oauth_type=oauth_type)
    if not oauth:
        uid = uid_new()
        oauth = Oauth2(id=uid, **kwargs)
        oauth.save()
    return oauth.id

def uid_by_oauth(oauth_id, oauth_type):
    oauth_type = OAUTH_TYPE[oauth_type]
    oauth = Oauth2.get(oauth_id=oauth_id, oauth_type=oauth_type)  
    if oauth:
        return oauth.id

if __name__ == '__main__':
    pass
    #print Oauth2(uid=1, type=2,auth_id=1, code='ss', token='sss', expires_in=123).save()
    a= Oauth2.get(uid=1, type=2)
    print a.token
