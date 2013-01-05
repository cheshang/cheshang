#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
from time import time
from model.db import Model
from model.photo import album_photo_list, Photo


class ALBUM_STATUS:
    PUBLIC = 1
    DELETE = 2


class Album(Model):

    @property
    def photos(self):
        return album_photo_list(self.id, limit=100)

    def can_edit(self, uid):
        return self.uid == int(uid)

    @property
    def cover_link(self):
        p = Photo.get(album_id=self.id)
        return p.link if p else ''



def album_get(id):
    return Album.get(id)


def album_new(name, txt, uid):
    album = Album(
        title=name,
        txt=txt,
        status=ALBUM_STATUS.PUBLIC,
        uid=uid,
        time=int(time())
    )
    album.save()
    return album

def album_latest(limit, offset, order_by='id DESC'):
    return Album.where(limit=limit, offset=offset, order_by=order_by)

def user_album_latest(limit, offset, uid, order_by='id DESC'):
    return Album.where(limit=limit, offset=offset, order_by=order_by, uid=uid)

def album_count(uid=0):
    if uid:
        return Album.count(uid=uid)
    return Album.count()


if __name__ == '__main__':
    pass
    print album_latest(10, 0)
    print user_album_latest(10, 0, 4)
