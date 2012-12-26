#!/usr/bin/python
# -*- coding: utf-8 -*-
import _envi
from msgpack import packb, unpackb
from operator import itemgetter
from model.connect import connection, mc


class _Model(type):
    def __new__(cls, name, bases, attrs):
        base0 = bases[0]
        if base0 is object:
            return super(_Model, cls).__new__(cls, name, bases, attrs)
        new_class = type.__new__(cls, name, bases, attrs)
        new_class.__table__ = table = name
        cur = connection.cursor()
        cur.execute('SELECT * FROM %s LIMIT 1' % name)
        print cur._last_executed
        new_class.__column__ = column = map(itemgetter(0), cur.description)
        new_class.MC_KEY = name + '_%s'
        return new_class        
        
class Model(object):
    __metaclass__ = _Model

    def __init__(self, *args, **kwargs):
        self.__dict__['id'] = None
        self._is_new = True
        for i, arg in enumerate(args):
            self.__dict__[self.__column__[i]] = arg
        for i in self.__column__[len(args):]:
            self.__dict__[i] = kwargs.get(i)
        self.__dict__['_updated'] = set()

    @classmethod
    def _data_to_obj(cls, data=None):
        if data:
            obj = cls(*data)
            obj.__dict__['_is_new'] = False
            return obj        

    @classmethod
    def get(cls, id=None, **kwargs):
        if id is None:
            if not kwargs:
                return
        data = None
        if id:
            id = str(id)
            kwargs['id'] = id
            mc_key = cls.MC_KEY % id
            data = mc.get(mc_key)
            if data:
                data = unpackb(data)
                return cls._data_to_obj(data)
        cur = connection.cursor()
        values = ['='.join((k, '"%s"' % v)) for k, v in kwargs.iteritems()]
        sql = 'SELECT * FROM %s WHERE '+' and '.join(values)+' LIMIT 1'
        cur.execute(sql % cls.__table__)
        data = cur.fetchone()
        print cur._last_executed
        if id or data:
            _id = data[0] if data else id
            mc_key = cls.MC_KEY % _id
            mc.set(mc_key, packb(data))
        return cls._data_to_obj(data)

    @classmethod
    def where(cls, limit=1, offset=0, order_by='id', **kwargs):
        cur = connection.cursor()
        values = ['='.join((k, '"%s"' % v)) for k, v in kwargs.iteritems()]
        sql = 'SELECT * FROM %s WHERE '+' and '.join(values)+' LIMIT %s OFFSET %s ORDER BY'
        cur.execute(sql % (cls.__table__, limit, offset, order_by))
        data = cur.fetchall()
        print cur._last_executed
        result = []
        for i in data:
            result.append(cls._data_to_obj(i))
        return result


    def update(self, **kwargs):
        for i in kwargs:
            self.__dict__[i] = kwargs[i]

    @classmethod
    def get_list(self, id_li):
        result = []
        return [self.get(id) for id in id_li]

    def save(self):
        if self._is_new:
            self._insert()
            self._is_new = False
        elif self._updated:
            self._update()
        self._updated.clear()
        return self

    def _query(self, query, values):
        cur = connection.cursor()
        cur.execute(query, values)
        print cur._last_executed
        return cur.lastrowid

    def __setattr__(self, name, value):
        dc = self.__dict__
        if name[0] != '_' and name in self.__column__:
            dc_value = dc[name]
            if dc_value is None:
                self._updated.add(name)
            else:
                if value is not None:
                    value = type(dc_value)(value)
                if dc_value != value:
                    self._updated.add(name)
            dc[name] = value
        else:
            attr = getattr(self.__class__, name, None)
            if attr and hasattr(attr, "fset"):
                attr.fset(self, value)
            else:
                dc[name] = value

    def _update(self):
        query = [
            'UPDATE %s SET ' % self.__table__,
            ','.join(['`%s`=%%s'%f for f in self._updated]),
            ' WHERE id=%s '
        ]
        values = [getattr(self, f) for f in self._updated]
        values.append(self.id)
        mc.delete(self.MC_KEY % self.id)
        self._query(" ".join(query), values)

    def _insert(self):
        'Uses SQL INSERT to create new record'

        id = self.id
        fields = [
            '`%s`'%f for f in self.__column__
            if id is not None or f != 'id'
        ]
        values = [getattr(self, f, None) for f in self.__column__ if id is not None or f != 'id']


        query = 'INSERT INTO %s (%s) VALUES (%s)' % (
               self.__table__,
               ','.join(fields),
               ','.join(['%s'] * len(fields) )
        )
        id = self._query(query, values)
        if self.id is None:
            self.id = id
        mc.delete(self.MC_KEY % self.id)
        return True
