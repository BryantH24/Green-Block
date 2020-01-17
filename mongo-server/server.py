import pymongo
from pymongo import MongoClient

from pywallet import wallet

from web3 import Web3
from web3.auto import w3


cluster = MongoClient("mongodb+srv://GreenBlockServer:@cluster0-tifxv.gcp.mongodb.net/test?retryWrites=true&w=majority")
db = cluster["GreenBlock"]
collection = db["UserInfo"]


oauthToken = "sampleOauth5"


def createNewUser(oauthToken):
    #check to see if account from oauthToken is already created
    users = collection.find({"OAuth" : oauthToken})
    for user in users:
        if user != "":
            return "account with your login credentials has already been created, please log in"

    mnemonic = wallet.generate_mnemonic()
    post = {"_id" : collection.count_documents({}) + 1 , "OAuth": oauthToken, "mnemonic": mnemonic}
    w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    collection.insert_one(post)
    return True


def logIn(oauthToken):
    users = collection.find({"OAuth" : oauthToken})
    for user in users:
        mnemonic = user["mnemonic"]
        print(mnemonic) #replace with blockchain stuff (brownie?)
        if mnemonic != "":
            return True
        else:
            return False
logIn(oauthToken)


#use web3py
def createObject(mnemonic, qrHash):
    w = wallet.create_wallet(network="ETH", seed=mnemonic, children=1)
    GreenBlock = w3.eth.contract(address=w['address'], abi=ABI)
    myContract.caller.createItem(qrHash)

createObject("small recipe science nation blind multiply filter cost outer large dash vault", 1231232)
