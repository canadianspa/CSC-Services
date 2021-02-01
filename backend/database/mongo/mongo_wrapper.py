import json
from pymongo import MongoClient
from bson.json_util import dumps

from common.config import MONGO_CLIENT_URL


class MongoClientWrapper:
    def __init__(self):
        self.client = MongoClient(MONGO_CLIENT_URL)

    def create(self, db, col, doc):
        _id = self.__get_next_sequence(db, col)
        result = self.upsert(db, col, _id, doc)

        return result

    def read(self, db, col):
        collection = self.client[db][col]
        result = collection.find()

        return self.bson_to_json(result)

    def update(self, db, col, _id, doc):
        result = self.upsert(db, col, _id, doc)

        return result

    def upsert(self, db, col, _id, doc):
        collection = self.client[db][col]

        query = {
            "_id": _id,
        }

        values = {
            "$set": doc,
        }

        result = collection.find_one_and_update(
            query,
            values,
            upsert=True,
            return_document=True,
        )

        return self.bson_to_json(result)

    def delete(self, db, col, _id):
        collection = self.client[db][col]

        query = {
            "_id": _id,
        }

        collection.delete_one(query)

        return _id

    def __get_next_sequence(self, db, col):
        collection = self.client[db].counters

        query = {
            "_id": col,
        }

        values = {
            "$inc": {
                "seq": 1,
            },
        }

        result = collection.find_one_and_update(
            query,
            values,
            return_document=True,
        )

        return result["seq"]

    def bson_to_json(self, bson):
        _json = dumps(bson)

        return json.loads(_json)