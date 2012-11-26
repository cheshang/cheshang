#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import web
from config import render
from view._base import route, JsonView, JsonLoginView
from model.album import album_new

@route('/j/catagory/new')
class cata_new(JsonView):
    def POST(self):
        user_id = self.current_user_id
        name = self.argument('name')
        if name:
            album_new(name, user_id)
        return self.render(1)


@route('/comment/(\d+)')
class Comment(JsonLoginView):
    def GET(self, id=0):
        return id