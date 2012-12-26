#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
import web
from view._base import route, View, LoginView
from model.album import album_new, album_get
from model.photo import photo_new

@route('/album/new')
class New(LoginView):
    def GET(self):
        return self.render()

    def POST(self):
        name, txt = self.arguments('name', 'txt')
        if name:
            album = album_new(name, txt, self.uid)
            self.redirect('/album/%s' % album.id)
        self.render()

@route('/album/(\d+)/upload')
class Upload(LoginView):
    def GET(self, album_id=0):
        album = album_get(album_id)
        if not album or not album.can_edit(self.uid):
            self.redirect('/album/%s' % album_id)
        return self.render()

    def POST(self, album_id=0):
        album = album_get(album_id)
        if not album or not album.can_edit(self.uid):
            self.redirect('/album/%s' % album_id)
        uid = self.current_user_id
        data = web.input(url=[], name=[], size=[])
        urls, sizes, names = [data[i] for i in ('url', 'size', 'name')]
        for url, size, name  in zip(urls, sizes, names):
            if url and size:
                photo_new(url, name, size, uid, album_id)
        self.redirect('/album/%s' % album_id)


@route('/album/(\d+)')
class view(View):
    def GET(self, album_id=0):
        album = album_get(album_id)
        if album:
            return self.render(album=album)
        else:
            self.redirect('/')