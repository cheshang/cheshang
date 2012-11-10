#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from lib.render import render_jinja


render = render_jinja(
    'template',
    encoding='utf-8',
)

HOST = "lerry.me"

#REDIS_HOST = 'localhost'
#REDIS_PORT = 6379
#REDIS_DB   = 1
#
#MYSQL_HOST = '127.0.0.1'
#MYSQL_PORT = 3306
#MYSQL_USER = 'work'
#MYSQL_PASSWD = '42qu'
#MYSQL_DB = 'work_car'
MONGO_HOST = '127.0.0.1'
MONGO_PORT = '27017'
MONGO_NAME = 'cheshang'

WEIBO_KEY  = '313715638'
WEIBO_SECRET = 'e987fcc38fee0de86b789c04217860dd'