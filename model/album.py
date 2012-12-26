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
        print self.uid, 'uid'
        return self.uid == int(uid)

    @property
    def cover_link(self):
        p = Photo.get(album_id=self.id)
        return p.link if p else ''



def album_get(id):
    return Album.get(id)


def album_new(name, txt, uid):
    album = Album(
        title   = name,
        txt    = txt,
        status = ALBUM_STATUS.PUBLIC,
        uid    = uid,
        time   = int(time())
    )
    album.save()
    return album
        

        
if __name__ == '__main__':
    pass
    print album_new('鲜花', 1)
