from flask import Flask, request, jsonify
from flask_cors import CORS

from veeqoimport.route import veeqoimport
from update.route import update
from postcoder.route import postcoder
from bandq.route import bandq
from googlecalendar.route import calendar
from veeqo.route import veeqo
from database.route import database
from shipping.route import shipping
import notifications.main

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")


@app.route("/")
def index():
    return app.send_static_file("index.html")


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file("index.html")

app.register_blueprint(veeqoimport, url_prefix="/api")
app.register_blueprint(update, url_prefix="/api")
app.register_blueprint(postcoder, url_prefix="/api")
app.register_blueprint(bandq, url_prefix="/api")
app.register_blueprint(calendar, url_prefix="/api")
app.register_blueprint(veeqo, url_prefix="/api")
app.register_blueprint(database, url_prefix="/api")
app.register_blueprint(shipping, url_prefix="/api")


if __name__ == "__main__":
    CORS(app)
    app.run(port=4000, debug=True, threaded=True)
