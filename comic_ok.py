from flask import Flask
from flask import render_template
from pymongo import MongoClient

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGO_PORT = 27017
DBS_NAME = 'comic_ok'
COLLECTION_NAME = 'characters_ok'


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/comic_ok/characters_ok')
def comic_ok():
    FIELDS = {
        "_id": False, "Comic": True, "name": True, "ID": True, "ALIGN": True,
        "EYE": True, "HAIR": True, "SEX": True, "GSM": True, "ALIVE": True,
        "APPEARANCES": True, "YEAR": True
    }
    with MongoClient(MONGODB_HOST, MONGO_PORT) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projections = FIELDS, limit = 55000)
        return json.dumps(list(projects))

if __name__ == '__main__':
    app.run(debug = True)
