#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
from model.db import Kv

Email = Kv('Email')

def email_save(uid, email):
    Email.set(uid, email)


def uid_by_email(email):
    email = email.lower()
    return Email.id_by_value(email)

if __name__ == '__main__':
    pass
