import pymongo
from pymongo import MongoClient
from time import gmtime, strftime
import json

mongoUrl = "mongodb+srv://user:password12345@cluster0-3s8ia.gcp.mongodb.net/test?retryWrites=true&w=majority"
cluster = MongoClient(mongoUrl)
db = cluster["GreenBlock"]
userDatabase = db["UserInfo"]
transactionDatabase = db["transactionHistory"]

def changeUserBalance(oauthToken, changeVal):
    user = userDatabase.find({"OAuth" : oauthToken})[0]
    prevBal = user["balance"]
    userDatabase.update_one({
      '_id': user["_id"]
    },{
      '$set': {
        'balance': prevBal + changeVal
      }
    }, upsert=False)
    return True

def getUserBalance(oauthToken):
    user = userDatabase.find({"OAuth" : oauthToken})[0]
    if user["balance"] == "":
        return 0
    else:
        return user["balance"]

def getHistory(oauthToken):
    transArr = []
    userHist = transactionDatabase.find({"OAuth" : oauthToken})
    for trans in userHist:
        transArr.append(trans)
    print(transArr)

def addTransaction(oauthToken, qrhash):
    post = {
                "_id" : transactionDatabase.count_documents({}) + 1 ,
                "OAuth": oauthToken,
                # "mnemonic": mnemonic,
                "qrHash": qrHash,
                "time" : strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())
            }
    transactionDatabase.insert_one(post)
    return jsonify({ 'transactionId': str(transactionDatabase.count_documents({}) + 1), 'timeCreated' : strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())}), 201
