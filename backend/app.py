from gevent import monkey
monkey.patch_all()

import os
from flask_cors import CORS
import cgi
from flask import Flask, render_template, jsonify, send_from_directory
from random import *
from flask_socketio import SocketIO

# STATIC_FOLDER = 'frontend/build'
STATIC_FOLDER = 'assets'

# app = Flask(__name__)
app = Flask(__name__,
            # static_folder = "./dist/static",
            static_folder=STATIC_FOLDER
            # template_folder = "./dist"
            )
# db = redis.StrictRedis('localhost', 6379, 0)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app)


# @app.route('/')
# def main():
#     return "TEST"

# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return send_from_directory('frontend/build', 'index.html')
# #
#
# @app.route('/static/<path:path>')
# def assets(path):
#     return send_from_directory('frontend/build', path)
# Serve React App




@app.route('/api/random')
def random_number():
    response = {
        'randomNumber': randint(1, 100)
    }
    return jsonify(response)


@app.route('/pymeetups/')
def pymeetups():
    return render_template('pymeetups.html')



@app.route('/popups/update')
def update():
    socketio.emit('city', {'city': cgi.escape('test')},
                  namespace="/dd")
    return "Done"


@app.route('/popups/')
def popups():
    return render_template('popup.html')

# @socketio.on('connect', namespace='/dd')
# def ws_conn():
#     c = db.incr('connected')
#     socketio.emit('msg', {'count': c}, namespace='/dd')
#
#
# @socketio.on('disconnect', namespace='/dd')
# def ws_disconn():
#     c = db.decr('connected')
#     socketio.emit('msg', {'count': c}, namespace='/dd')

@socketio.on('city', namespace='/dd')
def ws_city(message):
    print(message['city'])
    socketio.emit('city', {'city': cgi.escape(message['city'])},
                  namespace="/dd")


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if(path == ""):
        return send_from_directory(STATIC_FOLDER, 'index.html')
    else:
        if(os.path.exists(STATIC_FOLDER + "/" + path)):
            return send_from_directory(STATIC_FOLDER, path)
        else:
            return send_from_directory(STATIC_FOLDER, 'index.html')


if __name__ == '__main__':
    socketio.run(app, "0.0.0.0", port=5000, threaded=True, debug=True)
