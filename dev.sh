PREFIX=$(cd "$(dirname "$0")"; pwd)

#python $PREFIX/misc/boot/css_js.py
PROGRAM=$PREFIX/app.py
ps x -u $USER|ack $PROGRAM|awk  '{print $1}'|xargs kill -9
ps x -u $USER|ack 'jitter'|awk  '{print $1}'|xargs kill -9
jitter $PREFIX/coffee $PREFIX/static/js &

python $PROGRAM
