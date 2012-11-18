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
if 'Linux' not in platform.platform():
    MYSQL_HOST = '113.11.199.27'
MYSQL_PORT = 3306
MYSQL_USER = 'work'
MYSQL_PASSWD = '42qu'
MYSQL_DB = 'work_car'

WEIBO_KEY  = '313715638'
WEIBO_SECRET = '46ae82c9a4a6668f69178ed6e585dd32'
