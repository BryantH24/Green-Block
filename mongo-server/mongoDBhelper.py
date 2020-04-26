import pymongo
from pymongo import MongoClient
from time import gmtime, strftime
import json
from flask import Flask, jsonify

mongoUrl = "mongodb+srv://user:password12345@cluster0-3s8ia.gcp.mongodb.net/test?retryWrites=true&w=majority"
cluster = MongoClient(mongoUrl)
db = cluster["GreenBlock"]
userDatabase = db["UserInfo"]
transactionDatabase = db["transactionHistory"]

def createNewUser(oauthToken):
    post = {
            "_id" : userDatabase.count_documents({}) + 1 ,
            "OAuth": oauthToken,
            "balance" : 0,
            "status" : "User"
            }
    userDatabase.insert_one(post)

def login(oauthToken):
    try:
        user = userDatabase.find({"OAuth" : oauthToken})[0]
        return "user logged in"
    except IndexError:
        createNewUser(oauthToken)
        return "user created"


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
    return "user balance changed by " + str(changeVal)

def getUserBalance(oauthToken):
    user = userDatabase.find({"OAuth" : oauthToken})[0]
    if user["balance"] == "":
        return 0
    else:
        return str(user["balance"])

def getHistory(oauthToken):
    transArr = []
    userHist = transactionDatabase.find({"OAuth" : oauthToken})
    for trans in userHist:
        transArr.append(trans)
    return transArr

def createItem(oauthToken, qrhash):
    try:
        trans = transactionDatabase.find({"qrhash" : qrhash})[0]
        return "item already created"
    except IndexError:
        post = {
                "_id" : transactionDatabase.count_documents({}) + 1 ,
                "OAuth": oauthToken,
                "qrhash": qrhash,
                "time" : strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime()),
                "status" : "unvalidated"
                }
        transactionDatabase.insert_one(post)
        return str(post)


def validateItem(qrhash, value):
    try:
        trans = transactionDatabase.find({"qrhash" : qrhash})[0]
        if trans['status'] == "validated":
            # bottle has already bene validated
            return "item already validated"
        else:
            transactionDatabase.update_one({
              '_id': trans["_id"]
            },{
              '$set': {
                'status': "validated"
              }
            }, upsert=False)
            changeUserBalance(trans["OAuth"], value)
            return "item has been validated"
    except IndexError:
        return "item has not been created"

print(login("test12"))
print(createItem("test12", 22))
print(validateItem(22, 5))
print(getUserBalance("test12"))
print(getHistory("test12"))
