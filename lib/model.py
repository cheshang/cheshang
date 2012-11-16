#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import connection, mc
from operator import itemgetter

class _Model(type):
    def __new__(cls, name, bases, attrs):
        base0 = bases[0]
        if base0 is object:
            return super(_Model, cls).__new__(cls, name, bases, attrs)
        new_class = type.__new__(cls, name, bases, attrs)
        new_class.__table__ = table = name
        cur = connection.cursor()
        cur.execute('SELECT * FROM %s LIMIT 0' % name)
        new_class.__column__ = column = map(itemgetter(0), cur.description)
        new_class.connection = connection
        return new_class        
        
class Model(object):
    __metaclass__ = _Model

    def __init__(self, **kwargs):
        for i in args:
            self.__dict__[i]

        for i in self.__column__:
            self.__dict__[i] = kwargs.get(i)

        self.cursor = self.connection.cursor()

    @classmethod
    def get(self, id):
        cur = self.connection.cursor()
        #print self.__table__
        cur.execute('select * from %s where id = %s limit 1', (self.__table__, id))
        print cur.fetchone()
        print 123


class Profile(Model):
    pass

Profile.get(1)


