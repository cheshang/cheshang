#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import db

def oauth2_save(uid, **args):
    pass



    def access_token_save(self, token, expires):
        db.oauth2.update({'_id':self.uid, 'type':self.auth_type}, \
            {'$set':{'access_token':token, 'expires':expires}}, upsert=True)

    @property
    def code(self):
        tmp = db.oauth2.find_one({'_id':self.uid})
        return tmp['code'] if tmp else ''

    def account_by_oauth(self, auth_uid):
        return db.oauth2.find_one({'auth_type':self.auth_type,'uid':auth_uid})

if __name__ == '__main__':
    pass
