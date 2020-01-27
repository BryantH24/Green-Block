from time import gmtime, strftime
import json

from flask import Flask, jsonify
from flask import request
import pymongo
from pymongo import MongoClient
from pywallet import wallet
from web3 import Web3, HTTPProvider


##w["xprivate_key"] is the private key for the created wallet
cluster = MongoClient("mongodb+srv://GreenBlockServer:GreenestBlock123!@cluster0-tifxv.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["GreenBlock"]
logInDatabase = db["UserInfo"]
transactionDatabase = db["transactionHistory"]

ABI = json.load(open("Validator.json", "r"))['abi']

contractAddress = Web3.toChecksumAddress("0x41F5a83AA42B86a6a3da525A96D91a95E7e82c94")
##need to add userAddress 
userAddress = ""
privateKey = open("privateKey.txt")

oauthToken = "sampleOauth5"
w3 = Web3(HTTPProvider("https://ropsten.infura.io/v3/8f534b2f394a48a68f99f56dd61db9b3"))
app = Flask(__name__)

GreenBlockInstance = w3.eth.contract(address=contractAddress, abi=ABI)

def logIn(oauthToken):
    users = logInDatabase.find({"OAuth" : oauthToken})
    for user in users:
        mnemonic = user["mnemonic"]
        print(mnemonic) #replace with blockchain stuff (brownie?)
        return mnemonic

@app.route('/login', methods=['POST'])
def createNewUser():
    #check to see if account from oauthToken is already created
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthToken"]
    userArr = []
    users = logInDatabase.find({"OAuth" : oauthToken})
    for user in users:
        userArr.append(user)
        if user != "":
            mnenomic = logIn(oauthToken)
            unconvertedJson = {
            "status" : "Logged In"
            }
            return json.dumps(unconvertedJson)
    mnemonic = wallet.generate_mnemonic()
    post = {"_id" : logInDatabase.count_documents({}) + 1 , "OAuth": oauthToken, "mnemonic": mnemonic, "userStatus": "User"}
    w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    logInDatabase.insert_one(post)
    unconvertedJson = {
    "status" : "Created New User"
    }
    return json.dumps(unconvertedJson)


#web3py contract calls
@app.route('/createItem', methods=['POST'])
def createItem():
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthToken"]
    qrHash = oauthJson["qrHash"]
    mnemonic = logIn(oauthToken)
    # w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    GreenBlockInstance = w3.eth.contract(address=contractAddress, abi=ABI)

    post = {"_id" : transactionDatabase.count_documents({}) + 1 , "OAuth": oauthToken, "mnemonic": mnemonic, "qrHash": qrHash, "time" : strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())}
    transactionDatabase.insert_one(post)

    createItemTransaction = GreenBlockInstance.functions.createItem(qrHash, userAddress).buildTransaction({'chainId': 1,'gas': 100000,'gasPrice': GreenBlockCreateItem.functions.createItem(qrHash, userAddress).estimateGas(),'nonce': 0})

    signedCreateItem = w3.eth.account.sign_transaction(createItemTransaction, private_key=privateKey)
    return w3.eth.sendRawTransaction(signedCreateItem.rawTransaction)

@app.route('/getHistory', methods=['POST'])
def getHistory():
    global GreenBlockInstance

    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    mnemonic = logIn(oauthToken)

    print(mnemonic)

    w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)

    print(w)

    userAddress = Web3.toChecksumAddress(w['address'])

    itemIds, itemStates = GreenBlockInstance.caller.getHistory('0x51499e950B01aF5B74Ba602b4f47361940B4dc0d')

    return jsonify({'items': itemIds, 'states': itemStates}), 200

@app.route('/getBalance', methods=['POST'])
def getBalance():
    global GreenBlockInstance

    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    mnemonic = logIn(oauthToken)

    w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)

    userAddress = Web3.toChecksumAddress(w['address'])

    balance = GreenBlockInstance.caller.getBalance(userAddress)

    return jsonify({'balance': balance}), 200

@app.route('/validateItem', methods=['POST'])
def validateItem():
    oauthJson = request.get_json()
    oauthToken = oauthJson["oauthtoken"]
    mnemonic = logIn(oauthToken)
    # w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)

    validateItemTransaction = GreenBlockInstance.functions.validateItem(qrHash).buildTransaction({'chainId': 1,'gas': 100000,'gasPrice': GreenBlockInstance.functions.validateItem(qrHash, userAddress).estimateGas(),'nonce': 0})

    signedValidateItem = w3.eth.account.sign_transaction(validateItemTransaction, private_key=privateKey)
    return w3.eth.sendRawTransaction(signedValidateItem.rawTransaction)

@app.route("/")
def home():
    return "Hello, World!"

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    app.debug = True
    app.run(host = '0.0.0.0', port = 5000)
