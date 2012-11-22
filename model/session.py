#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import uuid
from binascii import a2b_hex, b2a_hex
from model.db import Model, Kv

Session = Kv('Session')

def session_new(uid):
    s = Session.get(uid)
    if s:
        s = b2a_hex(s)
    else:
        s = str(uuid.uuid4()).replace('-', '')
        Session.set(uid, a2b_hex(s))
    return s

def id_by_session(s):
    if s:
        return Session.id_by_value(a2b_hex(s))

def session_rm(uid):
    Session.delete(uid)
        
if __name__ == '__main__':
    pass
    print session_new(123)
