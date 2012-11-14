#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import hashlib
from lib.kv import Kv
Passwd = Kv('Passwd')

def passwd_save(uid, passwd):
    _passwd = hashlib.md5('%s.%s' % (uid, passwd)).hexdigest() 
    Passwd.set(uid, _passwd)

def passwd_verify(uid, passwd):
    _passwd = hashlib.md5('%s.%s' % (uid, passwd)).hexdigest()     
    return Passwd.get(uid) == _passwd

if __name__ == '__main__':
    pass