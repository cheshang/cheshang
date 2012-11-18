#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import uuid
from model.db import Model, Kv

Session = Kv('Session')

def session_new(uid):
    s = Session.get(uid)
    if not s:
        s = str(uuid.uuid4()).replace('-', '')
    Session.set(uid, s)
    return s

def id_by_session(s):
    if s:
        return Session.id_by_value(s)

def session_rm(uid):
    Session.delete(uid)
        
if __name__ == '__main__':
    pass
    print session_new(123)
