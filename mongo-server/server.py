import pymongo
from pymongo import MongoClient

from pywallet import wallet

from web3 import Web3
from web3.auto import w3

from flask import Flask
from flask import request

from time import gmtime, strftime

cluster = MongoClient("mongodb+srv://GreenBlockServer:@cluster0-tifxv.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["GreenBlock"]
logInDatabase = db["UserInfo"]
transactionDatabase = db["transactionHistory"]

ABIlist = ["sampleABI1", "sampleABI2"]


oauthToken = "sampleOauth5"

app = Flask(__name__)

def logIn(oauthToken):
    users = logInDatabase.find({"OAuth" : oauthToken})
    for user in users:
        mnemonic = user["mnemonic"]
        print(mnemonic) #replace with blockchain stuff (brownie?)
        return mnemonic
# @app.route('/login/<oauthToken>')

@app.route('/login', methods=['POST'])
def createNewUser():
    #check to see if account from oauthToken is already created
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthToken"]

    users = logInDatabase.find({"OAuth" : oauthToken})
    for user in users:
        if user != "":
            mnenomic = logIn(oauthToken)
            return mnenomic
        else:
            mnemonic = wallet.generate_mnemonic()
            post = {"_id" : logInDatabase.count_documents({}) + 1 , "OAuth": oauthToken, "mnemonic": mnemonic, "userStatus": "User"}
            w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
            logInDatabase.insert_one(post)
            return True


#use web3py
@app.route('/createItem', methods=['POST'])
def createItem():
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthToken"]
    qrHash = oauthJson["qrHash"]
    mnemonic = logIn(oauthToken)
    w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    # GreenBlockCreateItem = w3.eth.contract(address=w['address'], abi=ABIlist[0])
    # return GreenBlockCreateItem.caller.createItem(qrHash)

    post = {"_id" : transactionDatabase.count_documents({}) + 1 , "OAuth": oauthToken, "mnemonic": mnemonic, "qrHash": qrHash, "time" : strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())}
    transactionDatabase.insert_one(post)
    return "logged on database"

@app.route('/getHistory', methods=['POST'])
def getHistory(oauthToken):
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    mnemonic = logIn(oauthToken)
    w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    GreenBlockCreateItem = w3.eth.contract(address=w['address'], abi=ABIlist[1])
    return GreenBlockCreateItem.caller.getHistory()

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run()
