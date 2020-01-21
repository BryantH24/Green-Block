var GreenCoin = artifacts.require("./GreenCoin.sol");

contract('GreenCoin', (accounts) => {
    var userId1 = accounts[0];
    var gcoinInstance;

    it("Should fetch balance of caller and get 0 coins", async() =>  {
        gcoinInstance = await GreenCoin.deployed();
        balance = await gcoinInstance.getBalance(userId1);
        assert.equal(balance.toNumber(), 0);
    });
});