#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import db

class Oauth2Type:
    WEIBO = 'weibo'

def oauth2_save(uid, **args):
    pass

class Oauth2:
    def __init__(self, uid, auth_type):
        self.uid = uid
        self.auth_type = auth_type

    def code_save(self, code):
        db.oauth2.update({'_id':self.uid, 'type':self.auth_type}, \
            {'$set':{'code':code}}, upsert=True)

    def access_token_save(self, token, expires):
        db.oauth2.update({'_id':self.uid, 'type':self.auth_type}, \
            {'$set':{'access_token':token, 'expires':expires}}, upsert=True)

    @property
    def code(self):
        tmp = db.oauth2.find_one({'_id':self.uid})
        return tmp['code'] if tmp else ''

if __name__ == '__main__':
    pass
