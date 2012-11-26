#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
import platform
from lib.render import render_jinja


render = render_jinja(
    'template',
    encoding='utf-8',
)

HOST = "lerry.me"

MYSQL_HOST = '127.0.0.1'
MYSQL_PORT = 3306
MYSQL_USER = 'work'
MYSQL_PASSWD = '42qu'
MYSQL_DB = 'work_car'

MEMCACHED_ADDR = '127.0.0.1:11211'

OAUTH2 = dict()
OAUTH2['weibo'] = (123, 'xxxooo')


