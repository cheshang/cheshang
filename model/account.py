#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import string
import hashlib
from model._db import redis, redis_key
from model.base import id_new

REDIS_PROFILE = redis_key.Profile('%s')
REDIS_EMAIL   = redis_key.Email()
REDIS_PASSWD  = redis_key.Passwd()
REDIS_USER    = redis_key.User('%s')

PROFILE = {
    'name'  : 1,
    'sex'   : 2,
    'email' : 3
}

def account_new(email, passwd, name):
    name, passwd, name = map(string.strip, (email, passwd, name))
    uid = uid_by_email(email)
    if uid:
        return
    uid = id_new()
    redis.hset(REDIS_EMAIL, email, uid)
    passwd_save(uid, passwd)
    profile_save(uid, email=email, name=name)
    return uid

def uid_by_email(email):
    uid = redis.hget(REDIS_EMAIL, email)
    return int(uid) if uid else 0

def passwd_save(uid, passwd):
    _passwd = hashlib.md5('%s.%s' % (uid, passwd)).hexdigest() 
    redis.hset(REDIS_PASSWD, uid, _passwd)


def profile_save(uid, **args):
    key = REDIS_USER % uid
    p = redis.pipeline()
    for i in args:
        k = PROFILE[i]
        v = args[i]
        p.hset(key, k, v)
    p.execute()

def profile_get(uid):
    key = REDIS_USER % uid
    profile = redis.hgetall(key)
    result = {}
    for i in profile:
        k = [key for key, value in PROFILE.iteritems() if value == int(i)][0]
        v = profile[i]
        result[k] = v
    return result

        
if __name__ == '__main__':
    pass
    #print account_new('lvdachao@gmail.com', '123', 'Lerry')
    print profile_get(10025)
