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
    profile = Profile.get(uid)
    if not profile:
        profile = Profile(id=uid)
    profile.update(**args)
    profile.save()
        
def profile_get(uid):
    return Profile.get(uid)

if __name__ == '__main__':
    pass
