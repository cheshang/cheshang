#!/usr/bin/python
# -*- coding: utf-8 -*-
import _env
import hashlib
from yajl import dumps
from time import time
from base64 import b64encode
from config import UPYUN

def policy_signature_get(bucket):
    key, host = UPYUN[bucket]
    policy = {
        'bucket'        : bucket,
        'expiration'    : int(time()) + 360000,
        'save-key'      : '/{filemd5}',
    }
    policy = b64encode(dumps(policy))
    signature = hashlib.md5('%s&%s'% (policy, key)).hexdigest()
    return policy, signature

FUNCTIONS = {
    'upyun': policy_signature_get,
    'dumps': dumps,
}
