#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model.db import Model, Kv

GENDER_DICT = {
    'm': 1,
    'f': 2
}

class Profile(Model):
    pass

def profile_new(uid, **args):
    #name, avatar, motto, gender, birthday, city
    Profile(id=uid, **args).save()
        
def profile_get(uid):
    return Profile.get(uid)

if __name__ == '__main__':
    pass
