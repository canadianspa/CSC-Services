class MongoCollectionWrapper:
    def __init__(self, collection):
        self.collection = collection

    def create(self, doc):
        return self.collection.insert_one(doc)

    def read(self, query={}):
        return self.collection.find(query)

    def update(self, _id, doc):
        query = {"_id": _id}
        values = {"$set": doc}
        return self.collection.update_one(query, values)

    def delete(self, _id):
        query = {"_id": _id}
        return self.collection.delete_one(query)
