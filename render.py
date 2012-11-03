#!/usr/bin/python
# -*- coding: utf-8 -*-
import os

class render_jinja:
    """Rendering interface to Jinja2 Templates
    
    Example:

        render= render_jinja('templates')
        render.hello(name='jinja2')
    """
    def __init__(self, *a, **kwargs):
        self._path = kwargs.pop('_path', [])
        self.a = a
        self.kwargs = kwargs
        extensions = kwargs.pop('extensions', [])
        globals = kwargs.pop('globals', {})

        from jinja2 import Environment, FileSystemLoader
        self._lookup = Environment(loader=FileSystemLoader(*a, **kwargs), extensions=extensions)
        self._lookup.globals.update(globals)

    def __getattr__(self, name):
        path = self._path + [name]
        return self.__class__(_path=path, *self.a, **self.kwargs)

    def __str__(self):
        path = os.sep.join(self._path) + '.html'
        print path
        t = self._lookup.get_template(path)
        return t.render()

from jinja2 import Template

class _render(object):
    def __init__(self, path=[]):
        self.path = path

    def __getattr__(self, name):
        path = self.path+[name]
        return self.__class__(path)

    def __str__(self):
        return os.sep.join(self.path)


#render = render_jinja(
#    'template',
#    encoding='utf-8',
#)
#print render.test.index
