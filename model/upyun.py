#!/usr/bin/python
# -*- coding: utf-8 -*-
import hashlib
from json import dumps
from base64 import b64encode
from misc.config import UPYUN

def policy_signature_get(bucket):
key , host, bucket = ('123', '456', 'avatar')
policy = {
    'bucket'        : bucket,
    'expiration'    : int(time()) + 360000,
    'save-key'      : '/{filemd5}',
}
policy = b64encode(dumps(policy))
signature = hashlib.md5('%s&%s'% (policy, key)).hexdigest()
%>
