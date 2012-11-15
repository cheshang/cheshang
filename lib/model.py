#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model._db import connection
from operator import itemgetter

class _Model(type):
    def __new__(cls, name, bases, attrs):
        base0 = bases[0]
        if base0 is object:
            return super(_Model, cls).__new__(cls, name, bases, attrs)
        new_class = type.__new__(cls, name, bases, attrs)

        new_class.__table__ = table = name
        cur = connection.cursor()
        q = cur.execute('SELECT * FROM %s LIMIT 1' % name)
        print q
        new_class.__column__ = column = map(itemgetter(0), q.description)
        return new_class        
        
class A(object):
    __metaclass__ = _Model

class B(A):
    pass

a= B