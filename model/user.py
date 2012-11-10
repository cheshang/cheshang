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

    @property
    def email(self):
        return email_by_uid(self.uid)

    @property
    def name(self):
        tmp = profile_get(self.uid)
        return tmp.get('name') if tmp else ''
        
if __name__ == '__main__':
    pass
