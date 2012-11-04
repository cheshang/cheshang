#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from redis import StrictRedis
from lib.render import render_jinja
from lib.redis_key import RedisKey


render = render_jinja(
    'template',
    encoding='utf-8',
)

redis = StrictRedis(host='localhost', port=6379, db=1)
redis_key = RedisKey(redis)

HOST = 'img.lerry.tk'

