from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGO_PORT = 27017
DBS_NAME = 'comic_ok'
COLLECTION_NAME = 'characters_ok'
FIELDS = {
        "_id": False, "Comic": True, "name": True, "ID": True, "ALIGN": True,
        "EYE": True, "HAIR": True, "SEX": True, "GSM": True, "ALIVE": True,
        "APPEARANCES": True, "YEAR": True
    }


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/comic_ok/characters_ok')
def comic_ok():
    connection = MongoClient(MONGODB_HOST, MONGO_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection = FIELDS, limit = 50000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects)
    connection.close()
    return json_projects

if __name__ == '__main__':
    app.run(debug = True)
