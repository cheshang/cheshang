#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import db

def email_save(email):
    return db.email.insert({'email':email})

def uid_by_email(email):
    _result = db.email.find_one({'email':email})
    return str(_result['_id']) if _result else None

def email_by_uid(uid):
    _result = db.email.find_one({'_id':uid})
    return _result['email'] if _result else None

if __name__ == '__main__':
    pass
    #print email_save('lvdachao@gmail.com')
    print db.email.remove({'email':'lvdachao@gmail.com'})
    print uid_by_email('lvdachao@gmail.com')
