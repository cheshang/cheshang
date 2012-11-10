#coding:utf-8

import _env
import uuid
from model._db import db
from struct import pack, unpack
from base64 import urlsafe_b64encode, urlsafe_b64decode
import binascii

# 常量
class Session(object):
    @staticmethod
    def get(uid):
        result = db.session.find_one({'_id':uid})
        return result['session'] if result else None

    @staticmethod
    def set(uid, value):
        if value:
            db.session.insert({'_id':uid, 'session':value})
        else:
            db.session.remove({'_id':uid})

    @staticmethod
    def id_by_value(session):
        if session:
            result = db.session.find_one({'session':session})
            return str(result['_id']) if result else None


# 接口
############################################
def session_new(id):
    s = Session.get(id)
    if not s:
        s = str(uuid.uuid4()).replace('-', '')
        Session.set(id, s)
    return s

def id_by_session(session):
    return Session.id_by_value(session)

def session_rm(id):
    Session.set(id, None)

if __name__ == '__main__':
    print session_new(12345)
