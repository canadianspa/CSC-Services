import json
from bson.json_util import dumps
from bson.objectid import ObjectId

class MongoCollectionWrapper:
    def __init__(self, collection):
        self.collection = collection

    def create(self, doc):
        result = self.collection.insert_one(doc)
        return str(result.inserted_id)

    def read(self, query={}):
        result_bson = self.collection.find(query)
        result_json = dumps(result_bson)
        return json.loads(result_json)

    def update(self, id, doc):
        query = {"_id": ObjectId(id)}
        values = {"$set": doc}

        self.collection.update_one(query, values)
        return id

    def delete(self, id):
        query = {"_id": ObjectId(id)}

        self.collection.delete_one(query)
        return id

    def upsert(self, id, doc):
        query = {"_id": ObjectId(id)}
        values = {"$set": doc}

        result_bson = self.collection.find_one_and_update(query, values, upsert=True, return_document=True)
        result_json = dumps(result_bson)
        return json.loads(result_json)
