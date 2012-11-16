#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import connection, mc
from operator import itemgetter

class _Model(type):
    def __new__(cls, name, bases, attrs):
        base0 = bases[0]
        print base0
        if base0 is object:
            return super(_Model, cls).__new__(cls, name, bases, attrs)
        new_class = type.__new__(cls, name, bases, attrs)
        new_class.__table__ = table = name
        cur = connection.cursor()
        cur.execute('SELECT * FROM %s LIMIT 0' % name)
        new_class.__column__ = column = map(itemgetter(0), cur.description)
        new_class.connection = connection
        #print map(itemgetter(0), cur.description)
        return new_class        
        
class Model(object):
    __metaclass__ = _Model

    def __init__(self):
        self.cursor =  connection.cursor()
        for i in self.__column__:
            self.__dict__[i] = i

class Profile(Model):
    def __init__(self, id):
        super(Profile, self).__init__()
        self.data = self.cursor.execute('select * from Profile')
    pass
t = Profile(1)
print t
