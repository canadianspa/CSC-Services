import json
from pymongo import MongoClient
from jsonschema import validate
from bson.json_util import dumps
from bson.objectid import ObjectId

from common.config import MONGO_CLIENT_URL
from .schema.item import item_schema


def ItemsCollectionBuilder():
    client = MongoClient(MONGO_CLIENT_URL)
    database = client.shipping
    items = database.items

    return MongoCollectionWrapper(items, item_schema)


class MongoCollectionWrapper:
    def __init__(self, collection, schema):
        self.collection = collection
        self.schema = schema

    def create(self, doc):
        self.validate_doc(doc)

        result = self.collection.insert_one(doc)
        return str(result.inserted_id)

    def read(self):
        result = self.collection.find()
        return self.bson_to_json(result)

    def update(self, _id, doc):
        self.validate_doc(doc)

        query = {"_id": ObjectId(_id)}
        values = {"$set": doc}

        self.collection.update_one(query, values)
        return _id

    def delete(self, _id):
        query = {"_id": ObjectId(_id)}

        self.collection.delete_one(query)
        return _id

    def upsert(self, _id, doc):
        self.validate_doc(doc)

        query = {"_id": ObjectId(_id)}
        values = {"$set": doc}

        result = self.collection.find_one_and_update(
            query, 
            values, 
            upsert=True, 
            return_document=True
        )
        
        return self.bson_to_json(result)

    def validate_doc(self, instance):
        try:
            validate(instance=instance, schema=self.schema)
        except Exception as e:
            print(str(e))
    
    def bson_to_json(self, bson):
        result_json = dumps(bson)
        return json.loads(result_json)
