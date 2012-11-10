#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import hashlib
from model._db import db

def passwd_save(uid, passwd):
    _passwd = hashlib.md5('%s.%s' % (uid, passwd)).hexdigest() 
    db.passwd.insert({'_id':uid,'passwd':_passwd})

def passwd_verify(uid, passwd):
    print uid, passwd, type(uid), type(passwd)
    _passwd = hashlib.md5('%s.%s' % (uid, passwd)).hexdigest()     
    _result = db.passwd.find_one({'_id':uid})
    return _result['passwd'] == _passwd if _result else False

if __name__ == '__main__':
    pass
    #print db.passwd.find_one({'_id':'509d4f2917adb9063c0f6e47'})['passwd']
    print passwd_verify('509d573e17adb9158cd58913', 397334259)
