from time import gmtime, strftime
import json

from flask import Flask, jsonify
from flask import request
import pymongo
from pymongo import MongoClient
from pywallet import wallet
from web3 import Web3, HTTPProvider
import mongoDBhelper as mongoHelp

# import config


##w["xprivate_key"] is the private key for the created wallet
# mongoUrl = "mongodb+srv://{user}:{password}@{server}/test?retryWrites=true&w=majority".format(
#                 user=config.MONGO_USER, password=config.MONGO_PASSWORD, server=config.MONGO_SERVER
#             )
mongoUrl = "mongodb+srv://user:password12345@cluster0-3s8ia.gcp.mongodb.net/test?retryWrites=true&w=majority"
cluster = MongoClient(mongoUrl)
db = cluster["GreenBlock"]
logInDatabase = db["UserInfo"]
transactionDatabase = db["transactionHistory"]

ABI = json.load(open("Validator.json", "r"))['abi']

# contractAddress = Web3.toChecksumAddress(config.CONTRACT_ADDRESS)
##need to add userAddress
# appAddress = Web3.toChecksumAddress(config.APP_ADDRESS)
# privateKey = open("privateKey.txt").read().strip()

oauthToken = "sampleOauth5"
# w3 = Web3(HTTPProvider(config.CONTRACT_PROVIDER))
app = Flask(__name__)

# GreenBlockInstance = w3.eth.contract(address=contractAddress, abi=ABI)

# def logIn(oauthToken):
#     users = logInDatabase.find({"OAuth" : oauthToken})
#     for user in users:
#         mnemonic = user["mnemonic"]
#         print(mnemonic) #replace with blockchain stuff (brownie?)
#         return mnemonic


# args: oauthtoken
@app.route('/login', methods=['POST'])
def createNewUser():
    #check to see if account from oauthToken is already created
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    return mongoHelp.login(oauthToken)
    # userArr = []
    # users = logInDatabase.find({"OAuth" : oauthToken})
    # for user in users:
    #     userArr.append(user)
    #     if user != "":
    #         # mnenomic = logIn(oauthToken)
    #
    #         return jsonify({ "status" : "Logged In",  "userStatus" : user["userStatus"]}), 200
    #
    # # mnemonic = wallet.generate_mnemonic()
    #
    # post = {
    #     "_id" : logInDatabase.count_documents({}) + 1 ,
    #     "OAuth": oauthToken,
    #     # "mnemonic": mnemonic,
    #     "userStatus": "User",
    #     "balance" : 0
    # }
    #
    # # w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    #
    # logInDatabase.insert_one(post)
    #
    # return jsonify({ "status" : "Created New User" }), 201


#web3py contract calls
# args: oauthtoken, qrhash
@app.route('/createItem', methods=['POST'])
def createItem():
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    qrHash = oauthJson["qrhash"]
    # mnemonic = logIn(oauthToken)
    return mongoHelp.createItem(oauthToken, qrHash)

    # w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)

    # userAddress = Web3.toChecksumAddress(w['address'])

    # post = {
    #             "_id" : transactionDatabase.count_documents({}) + 1 ,
    #             "OAuth": oauthToken,
    #             # "mnemonic": mnemonic,
    #             "qrHash": qrHash,
    #             "time" : strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())
    #         }
    #
    # transactionDatabase.insert_one(post)

    # createItemTransaction = GreenBlockInstance.functions.createItem(qrHash, userAddress).buildTransaction({
    #     'chainId': 3,
    #     'gas': 1000000,
    #     'gasPrice': 1000000,
    #     'nonce': w3.eth.getTransactionCount(appAddress)
    # })

    # signedCreateItem = w3.eth.account.sign_transaction(createItemTransaction, private_key=privateKey)
    #
    # txId = w3.eth.sendRawTransaction(signedCreateItem.rawTransaction).hex()

    # return jsonify({ 'transactionId': str(transactionDatabase.count_documents({}) + 1), 'timeCreated' : strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())}), 201

# args: oauthtoken
@app.route('/getHistory', methods=['POST'])
def getHistory():
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    return mongoHelp.getHistory(oauthToken)
    # mnemonic = logIn(oauthToken)
    #
    # print(mnemonic)
    #
    # # w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    #
    # print(w)
    #
    # # userAddress = Web3.toChecksumAddress(w['address'])
    #
    # itemIds, itemStates = GreenBlockInstance.caller.getHistory(userAddress)
    #
    # dicArray = []
    # items = logInDatabase.find({"OAuth" : oauthToken})
    # for i in range(0, len(itemIds)):
    #     dicObject = {'items' : itemIds[i], 'states' : itemStates[i], 'createTime' : items[i]}
    #     dicArray.append(dicObject)
    # return jsonify(dicArray), 200

# need to switch to mongoDB
@app.route('/getBalance', methods=['POST'])
def getBalance():
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    return mongoHelp.getBalance(oauthToken)
    # mnemonic = logIn(oauthToken)
    #
    # w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    #
    # userAddress = Web3.toChecksumAddress(w['address'])
    #
    # balance = GreenBlockInstance.caller.getBalance(userAddress)
    #
    # return jsonify({ 'balance': balance }), 200

@app.route('/validateItem', methods=['POST'])
def validateItem():
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    qrHash = oauthJson["qrhash"]
    return mongoHelp.validateItem(qrhash, 1)
    # mnemonic = logIn(oauthToken)
    #
    # w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    #
    # validateItemTransaction = GreenBlockInstance.functions.validateItem(qrHash).buildTransaction({
    #     'chainId': 3,
    #     'gas': 100000,
    #     'gasPrice': 1000000,
    #     'nonce': w3.eth.getTransactionCount(appAddress)
    # })
    #
    # signedValidateItem = w3.eth.account.sign_transaction(validateItemTransaction, private_key=privateKey)
    #
    # txId = w3.eth.sendRawTransaction(signedValidateItem.rawTransaction).hex()
    #
    # return jsonify({ 'transactionId': str(txId) }), 201

@app.route("/")
def home():
    return "Hello, World!"

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run(host = '0.0.0.0', port = 5000)
