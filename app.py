from flask import Flask, jsonify, render_template
from dotenv import load_dotenv
from os import environ
from flask_sqlalchemy import SQLAlchemy
from flask_pymongo import PyMongo
import json
from bson import json_util

load_dotenv()


app = Flask(__name__)
app.config['MONGO_URI'] = environ.get('MONGODB_URI')
##app.config["MONGO_URI"] = "mongodb://localhost:27017/nflduidb"

# database setup
mongo = PyMongo(app)


nflduidb = mongo.db.nflduidb
###nflduidb.drop()
with open('static/data/nfl-dui2.json') as f:
    data = json.load(f)
    for row in data:
        nflduidb.insert_one(row)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/main", methods=['GET'])
def main():

    maindb = nflduidb    
    allnfldui = maindb.find()    
    nflduijson = json.loads(json_util.dumps(allnfldui))
    return jsonify(nflduijson)

if __name__ == '__main__':
        app.run(debug=True)