#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import db

class Oauth2_Type:
    WEIBO = 'weibo'

class Oauth2(Object):
    def __init__(self, uid, auth_type):
        self.uid = uid
        self.auth_type = auth_type

    def code_save(self, code):
        db.oauth2.insert('_id':self.uid, 'code':code)

    @property
    def code(self):
        tmp = db.oauth2.find_one({'_id':self.uid})
        return tmp['code'] if tmp else ''

if __name__ == '__main__':
    pass
