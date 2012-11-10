#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import string
from model._db import db
from model.passwd import passwd_save
from model.email import uid_by_email, email_save

def account_new(email, passwd, name):
    name, passwd, name = map(string.strip, (email, passwd, name))
    email = email.lower()
    uid = uid_by_email(email)
    if uid:
        return
    uid = str(email_save(email))
    passwd_save(uid, passwd)
    profile_save(uid, name=name)
    return uid

def oauth2_account_new(auth_type, uid):
    query = {'type':auth_type, 'uid':uid}
    oauth = db.oauth2_account.find_one(query)
    if oauth:
        return str(oauth['_id'])
    else:
        oauth_id = db.oauth2_account.insert(query)
        return str(oauth_id)

def profile_save(uid, **args):
    args['_id'] = uid
    db.profile.insert(args)

def profile_get(uid):
    return db.profile.find_one({'_id':uid})
        
if __name__ == '__main__':
    pass