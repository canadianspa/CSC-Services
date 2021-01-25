from flask import Blueprint, request, jsonify

from .mongo.mongo_wrapper import MongoClientWrapper

database = Blueprint("database", __name__)

client = MongoClientWrapper()


@database.route("/database/<db>/<col>", methods=["GET"])
def database_read_request(db, col):
    result = client.read(db, col)

    return jsonify(result)


@database.route("/database/<db>/<col>", methods=["POST"])
def database_create_request(db, col):
    doc = request.json

    result = client.create(db, col, doc)

    return jsonify(result)


@database.route("/database/<db>/<col>/<_id>", methods=["PUT"])
def database_update_request(db, col, _id):
    _id = int(_id)
    doc = request.json

    result = client.update(db, col, doc, _id)

    return jsonify(result)


@database.route("/database/<db>/<col>/<_id>", methods=["DELETE"])
def database_delete_request(db, col, _id):
    _id = int(_id)

    result = client.delete(db, col, _id)

    return jsonify(result)