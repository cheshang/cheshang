#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import db
from model.email import email_by_uid
from model.account import profile_get

class User(object):
    """user object"""
    def __init__(self, uid):
        self.uid = uid
        self.data = profile_get(uid)

    @property
    def email(self):
        return email_by_uid(self.uid)

    def __getattr__(self, name):
        return self.data.get(name, '')
        
if __name__ == '__main__':
    print User('509e8ed717adb915140a6dd1').avatar
    pass
