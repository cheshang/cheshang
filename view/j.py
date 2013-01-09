#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
import web
from config import render
from lib.utils import RE_EMAIL
from view._base import route, JsonView, JsonLoginView
from model.album import album_new
from model.email import uid_by_email
from model.fav import fav_album_new, fav_photo_new, fav_album_rm, fav_photo_rm

@route('/j/email/verify')
class email_exists(JsonView):
    def POST(self):
        email = self.argument('email')
        if not RE_EMAIL.match(email):
            return self.render('邮箱格式不正确')
        if uid_by_email(email):
            return self.render('邮箱已被注册')
        else:
            return self.render('ok')

    GET = POST


@route('/j/catagory/new')
class cata_new(JsonLoginView):
    def POST(self):
        user_id = self.current_user_id
        name = self.argument('name')
        if name:
            album_new(name, user_id)
        return self.render(1)

@route('/j/album/(\d+)/upload')
class Upload(JsonLoginView):
    def POST(self, album_id=0):
        album = album_get(album_id)
        if not album or not album.can_edit(self.uid):
            return self.render(0)
        uid = self.current_user_id
        data = web.input(url=[], name=[], size=[])
        urls, sizes, names = [data[i] for i in ('url', 'size', 'name')]
        for url, size, name  in zip(urls, sizes, names):
            if url and size:
                photo_new(url, name, size, uid, album_id)
        return self.render(1)

@route('/j/fav/album/new')
class FavNew(JsonLoginView):
    def POST(self):
        id = self.argument('obj_id')
        fav_album_new(self.uid, int(obj_id))
        return self.render(1)

@route('/j/fav/photo/new')
class FavNew(JsonLoginView):
    def POST(self):
        id = self.argument('obj_id')
        fav_photo_new(self.uid, int(obj_id))
        return self.render(0)

@route('/j/fav/album/rm')
class FavNew(JsonLoginView):
    def POST(self):
        id = self.argument('obj_id')
        fav_album_rm(self.uid, int(obj_id))
        return self.render(0)

@route('/j/fav/photo/rm')
class FavNew(JsonLoginView):
    def POST(self):
        id = self.argument('obj_id')
        fav_photo_new(self.uid, int(obj_id))
        return self.render(0)
