#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from time import time
from binascii import a2b_hex, b2a_hex
from model.db import Model
from config import UPYUN

URL_BASE = UPYUN['cheshang'][1]


class PHOTO_STATUS:
    PUBLIC = 1
    DELETE = 2

class Photo(Model):

    @property 
    def url(self):
        return b2a_hex(self.md5)

    @property
    def link(self):
        return URL_BASE % self.url

def photo_new(url, title, size, uid, album_id):
    photo = Photo(
        md5      = a2b_hex(url),
        title    = title,
        status   = PHOTO_STATUS.PUBLIC,
        uid      = uid,
        album_id = album_id,
        size     = size,
        time     = int(time())
    )
    photo.save()
    return photo.id

def album_photo_list(album_id, limit=1, offset=0):
    return Photo.where(
        album_id=album_id, 
        limit=limit, 
        offset=offset
    )

        
if __name__ == '__main__':
    pass
    #print photo_new('3406c25ad9d14393847323bd69a7966a', 'nihao', 2, 2)
    print album_photo_list(1000000, limit=100)
    print Photo.get(album_id=1000002)
