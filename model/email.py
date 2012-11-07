#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from lib.kv import Kv

Email = Kv('Email')

def uid_by_email(email):
    return Email.id_by_value(email)

if __name__ == '__main__':
    pass
