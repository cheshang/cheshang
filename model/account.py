#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import string
from model.passwd import passwd_save
from model.profile import profile_new
from model.email import uid_by_email, email_save

def account_new(email, passwd, name):
    name, passwd, name = map(string.strip, (email, passwd, name))
    email = email.lower()
    uid = uid_by_email(email)
    if uid:
        return
    uid = email_save(email)
    passwd_save(uid, passwd)
    profile_new(uid, name=name)
    return uid
        
if __name__ == '__main__':
    pass