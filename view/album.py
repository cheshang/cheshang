#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
import web
from view._base import route, View, LoginView
from model.album import album_new, album_get
from model.photo import photo_new


class New(LoginView):
    def GET(self):
        return self.render(template_name='album/upload.html')

    def POST(self):
        name, txt = self.arguments('name', 'txt')
        if name:
            
            self.redirect('/album/%s' % album.id)
        self.render()

@route('/album/new')
class Upload(LoginView):
    def GET(self):
        return self.render()

    def POST(self):
        #return web.input(url=[], name=[], size=[])
        album_id, title, txt = self.arguments('album_id', 'title', 'txt')
        album_id = int(album_id or 0)
        if not album_id and title:
            album = album_new(title, txt, self.uid)
        else:
            album = album_get(album_id)
        if not album or not album.can_edit(self.uid):
            return self.redirect('/album/%s' % album_id)
        uid = self.uid
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