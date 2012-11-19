#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from time import time
from model.db import Model

class ALBUM_STATUS:
    PUBLIC = 1
    DELETE = 2


class Album(Model):
    pass

def album_new(name, uid):
    album = Album(
        name   = name,
        status = ALBUM_STATUS.PUBLIC,
        uid    = uid,
        time   = int(time())
    )
    album.save()
    return album.id
        

        
if __name__ == '__main__':
    pass
    print album_new('鲜花', 1)
