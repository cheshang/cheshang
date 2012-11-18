#!/usr/bin/env python
# -*- coding: utf-8 -*-
import _env
from model.connect import connection, mc

class Kv(object):
    def __init__(self, table, NULL=''):
        self.table = table
        self.cursor = connection.cursor()
        self.prefix = table + '_%s'
        self.prefix_v = table + '_v_%s'
        self.NULL = NULL

    def get(self, id):
        mc_key = self.prefix % id
        r = mc.get(mc_key)
        if r is None:
            cursor = self.cursor
            cursor.execute('SELECT value FROM %s WHERE id=%s' % (self.table, id))
            print cursor._last_executed
            r = cursor.fetchone()
            if r:
                r = r[0]
            if r is None:
                r = self.NULL
            mc.set(mc_key, r)
        return r

    def get_list(self, id_list):
        mc_key = self.prefix
        result = mc.get_dict([mc_key%i for i in id_list])
        r = []
        for i in id_list:
            t = result.get(mc_key%i)
            if t is None:
                t = self.get(i)
            r.append(t)
        return r

    def save(self, value):
        table = self.table
        cursor = self.cursor
        cursor.execute(
            'INSERT INTO %s (value) VALUES (%%s) ' % table,
            value
        )
        print cursor._last_executed
        id = cursor.lastrowid
        mc.set(self.prefix%id, value)
        return id

    def set(self, id, value):
        r = self.get(id)
        if r != value:
            table = self.table
            cursor = self.cursor
            cursor.execute(
                'INSERT INTO %s (id,value) VALUES (%%s,%%s) on duplicate key UPDATE value=%%s' % table,
                (id, value, value)
            )
            print cursor._last_executed
            #cursor.connection.commit()
            if value is None:
                value = False
            mc_key = self.prefix % id
            mc.set(mc_key, value)

    def delete(self, id):
        value = self.get(id)
        cursor = self.cursor
        cursor.execute('DELETE FROM %s WHERE id=%%s' % self.table, id)
        print cursor._last_executed
        mc.delete(self.prefix % id)
        mc.delete(self.prefix_v % value)

    def id_by_value(self, value):
        mc_key = self.prefix_v % value
        r = mc.get(mc_key)
        if r is None:
            cursor = self.cursor
            cursor.execute('SELECT id FROM %s WHERE value="%s"' % (self.table, value))
            print cursor._last_executed
            r = cursor.fetchone()
            if r:
                r = r[0]
                mc.set(mc_key, r)
            else:
                r = 0
        return r

if __name__ == '__main__':
    txt = Kv('Txt')
    print txt.save('asdfqwfd')
