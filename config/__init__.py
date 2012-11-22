#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import _env
from default import *
if os.path.exists(os.path.join(os.path.dirname(__file__), '_private')):
    from config._private import *
