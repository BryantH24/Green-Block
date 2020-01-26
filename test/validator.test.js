var Validator = artifacts.require("./Validator.sol");
var User = artifacts.require("./User.sol");
var GreenCoin = artifacts.require("./GreenCoin.sol");

contract('Validator', (accounts) => {
    var user1Id = accounts[0];
    var user2Id = accounts[1];
    var userInstance;
    var reward = 5;

    beforeEach('setup contract for each test', async() => {
        gcoinInstance = await GreenCoin.new();
        userInstance = await User.new(gcoinInstance.address);
        validatorInstance = await Validator.new(gcoinInstance.address, userInstance.address);
    });

    it("Testing using only validator instance", async() => {
        result2 = await validatorInstance.createItem('hash1', user1Id);
        result3 = await validatorInstance.createItem('hash2', user1Id);
        
        result = await validatorInstance.validateItem('hash1');
        result = await validatorInstance.validateItem('hash2');

        historyval = await validatorInstance.getHistory(user1Id);

        afterBalance = await validatorInstance.getBalance(user1Id);

        console.log(historyval);
        assert.equal(reward * 2, afterBalance.toNumber());
    })

    it("Should create item hash1 as user1 and validation should reward user1", async() =>  {
        result1 = await userInstance.createItem('hash1', user1Id);
        result2 = await validatorInstance.validateItem('hash1');

        history = await userInstance.getHistory(user1Id);

        afterBalance = await gcoinInstance.getBalance(user1Id);

        assert.equal(reward, afterBalance.toNumber());
    });

    it("Should create item hash1 as user1, hash2 as user2 and validation should reward appropriate users", async() =>  {
        result1 = await userInstance.createItem('hash1', user1Id);
        result1 = await userInstance.createItem('hash2', user2Id);
        result1 = await userInstance.createItem('hash3', user2Id);

        resultBefore = await userInstance.idToItem.call('35264242174310653739930584824650794736281833835849161548889533775774637086175');

        result2 = await validatorInstance.validateItem('hash1');
        result3 = await validatorInstance.validateItem('hash2');
        result3 = await validatorInstance.validateItem('hash3');

        resultAfter = await userInstance.idToItem.call('35264242174310653739930584824650794736281833835849161548889533775774637086175');

        console.log(resultBefore, resultAfter);

        history = await userInstance.getHistory(user1Id);
        history2 = await userInstance.getHistory(user2Id);

        console.log(history2['0'].toString(), history2, history['0'][0].toString());

        afterBalance1 = await gcoinInstance.getBalance(user1Id);
        afterBalance2 = await gcoinInstance.getBalance(user2Id);

        console.log(reward, afterBalance1.toNumber(), afterBalance2.toNumber());

        assert.equal(reward, afterBalance1.toNumber());
        assert.equal(reward * 2, afterBalance2.toNumber());
    });

    it("Should create item hash1 as user1 and should only succeed in validation and rewarding once", async() =>  {
        result1 = await userInstance.createItem('hash1', user1Id);

        // Should validate item and reward user
        result2 = await validatorInstance.validateItem('hash1');

        // Should not reward user for validating a validated item
        result3 = await validatorInstance.validateItem('hash1');
        result4 = await validatorInstance.validateItem('hash1');

        history = await userInstance.getHistory(user1Id);

        afterBalance1 = await gcoinInstance.getBalance(user1Id);

        assert.equal(reward, afterBalance1.toNumber());
    });
});