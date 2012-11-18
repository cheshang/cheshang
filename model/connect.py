#coding:utf-8

# 初始化数据连接
import _env
import MySQLdb
import DBUtils.PersistentDB
from lib.cache import cache as mc
from config import MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWD, MYSQL_DB

mysql_args= {
    'host': MYSQL_HOST,
    'port': MYSQL_PORT, 
    'user': MYSQL_USER, 
    'passwd': MYSQL_PASSWD, 
    'db': MYSQL_DB, 
    'charset': 'utf8'
}


persist = DBUtils.PersistentDB.PersistentDB(MySQLdb, 1000, **mysql_args)
connection = persist.connection()

if __name__ == '__main__':
    pass
