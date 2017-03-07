from pymongo import MongoClient
import os


MONGO_HOST = 'localhost'
MONGO_PORT = 27017

DBS_NAME = os.getenv('MONGO_DB_NAME','comic_ok')
COLLECTION_NAME = os.getenv('MONGO_COLLECTION_NAME','characters_ok')


connection = MongoClient(MONGO_HOST, MONGO_PORT)
collection = connection[DBS_NAME][COLLECTION_NAME]

modified = connection[DBS_NAME]["Modified_Characters"]

# Inserting Some Data into a Collection
# st = {
#     "Name": "Joe Bloggs",
#     "Age": 37,
#     "email": "joe@example.com",
#     "Town": "Adare"
# }
#
# collection.insert_one(st)


# Find and add a column to any rows missing the column
characters = collection.find()

for char in characters:
    if char['APPEARANCES'] == 'unknown':
        char['APPEARANCES'] = 0
    modified.save(char)

#
#
# # Find and change a column value
# students = collection.find()
#
# for student in students:
#     if student['Age'] == None:
#         student['Age'] = -1
#         collection.save(student)
#
#
#
#
# #Find and change a column value and save in new collection
# students = collection.find()
#
# for student in students:
#     if student['email'] == '':
#         student['email'] = 'I dunno'
#     new_collection.save(student)