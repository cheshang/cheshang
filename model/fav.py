#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
from time import time
from model.db import Model


class FAV_TYPE:
    ALBUM = 1
    PHOTO = 2


class Fav(Model):

    def can_edit(self, uid):
        return self.uid == int(uid)

def fav_new(uid, id, obj_type):
    now = int(time())
    fav = Fav.get(obj_type=obj_type, obj_id=obj_id, uid=uid)
    if not fav:
        fav = Fav(
            obj_type = obj_type,
            obj_id = id,
            uid = uid
        )
    fav.create_time = now
    fav.save()
    return fav

def fav_rm(uid, obj_id, obj_type):
    fav = Fav.get(uid=uid, obj_id=obj_id, obj_type)
    if fav:
        fav.delete()

def fav_album_new(uid, id):
    fav = fav_new(uid, id, FAV_TYPE.ALBUM)
    return fav

def fav_album_rm(uid, obj_id):
    fav_rm(uid, obj_id, FAV_TYPE.ALBUM)

def fav_photo_new(uid, id):
    fav = fav_new(uid, id, FAV_TYPE.PHOTO)
    return fav

def fav_photo_rm(uid, obj_id):
    fav_rm(uid, obj_id, FAV_TYPE.PHOTO)


if __name__ == '__main__':
    pass
