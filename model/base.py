#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from config import redis, redis_key
REDIS_ID_MAX = redis_key.IdMax()

def init():
    id = redis.get(REDIS_ID_MAX)
    if not id:
        id = redis.set(REDIS_ID_MAX, 10000)

def id_new():
    return redis.incr(REDIS_ID_MAX)
        
init()

if __name__ == '__main__':
    print id_new()
    pass
