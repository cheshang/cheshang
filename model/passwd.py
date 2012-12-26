#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
import hashlib
from model.db import Kv
from binascii import a2b_hex

Passwd = Kv('Passwd')

def passwd_save(uid, passwd):
    _passwd = hashlib.md5('%s.%s' % (uid, passwd)).hexdigest() 
    Passwd.set(uid, a2b_hex(_passwd))

def passwd_verify(uid, passwd):
    _passwd = hashlib.md5('%s.%s' % (uid, passwd)).hexdigest()     
    return Passwd.get(uid) == a2b_hex(_passwd)

if __name__ == '__main__':
    pass