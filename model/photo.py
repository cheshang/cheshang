#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from time import time
from binascii import a2b_hex
from model.db import Model

class PHOTO_STATUS:
    PUBLIC = 1
    DELETE = 2

class Photo(Model):
    pass

def photo_new(url, title, uid, album_id):
    photo = Photo(
        url      = a2b_hex(url),
        title    = title,
        status   = PHOTO_STATUS.PUBLIC,
        uid      = uid,
        album_id = album_id,
        time     = int(time())
    )
    photo.save()
    return photo.id

        
if __name__ == '__main__':
    pass
    print photo_new('3406c25ad9d14393847323bd69a7966a', 'nihao', 2, 2)
