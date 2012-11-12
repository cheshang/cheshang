#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import db

def oauth2_save(uid, auth_type, arg):
    # uid, code, token
    db.oauth2.update({'_id':uid, 'auth_type':auth_type}, {'$set':{'code':arg.code, 'access_token':arg.access_token, \
        'expires_in':arg.expires_in}}, upsert=True)

class Oauth2(object):
    def __init__(self, auth_type, id):
        self.id = id
        self.auth_type = auth_type
        self.data = db.oauth2.find_one({'_id':self.id})
        
    def _get_item(self, name, default=''):
        return self.data.get(name, default)

    @property
    def access_token(self):
        return self._get_item('access_token')

    @property
    def expires_in(self):
        return self._get_item('expires_in')

    @property
    def uid(self):
        return int(self._get_item('_id', 0))

if __name__ == '__main__':
    pass
