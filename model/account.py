#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import string
from time import time
from model.db import Kv
from model.passwd import passwd_save
from model.profile import profile_new
from model.email import uid_by_email, email_save

Account = Kv('Account')

def uid_new():
    return Account.save(int(time()))

def account_new(email, passwd, name):
    email = email.lower()
    if uid_by_email(email):
        return
    uid = uid_new()
    email_save(uid, email)
    passwd_save(uid, passwd)
    profile_new(uid, name=name)
    return uid
        
if __name__ == '__main__':
    pass
    print uid_new()