#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model.email import Email
from model.profile import profile_get

class User(object):
    """user object"""
    def __init__(self, uid):
        self.uid = uid
        self.data = profile_get(uid)

    @property
    def email(self):
        return Email.get(self.uid)

    def __getattr__(self, name):
        return getattr(self.data, name) or ''
        
if __name__ == '__main__':
    print User(1).email
    pass
