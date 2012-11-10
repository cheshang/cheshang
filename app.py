#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from view._site import *
from view._base import route
from lib.reload.reload_server import auto_reload

urls = route.urls
#web.config.debug = True
app = web.application(urls, globals())


if __name__ == '__main__':
    auto_reload(app.run)