var Validator = artifacts.require("./Validator.sol");
var User = artifacts.require("./User.sol");
var GreenCoin = artifacts.require("./GreenCoin.sol");

contract('Validator', (accounts) => {
    var user1Id = accounts[0];
    var userInstance;

    beforeEach('setup contract for each test', async() => {
        gcoinInstance = await GreenCoin.deployed();
        userInstance = await User.deployed(gcoinInstance.address);
        validatorInstance = await Validator.deployed(userInstance.address, gcoinInstance.address);
    });

    it("Should create item hash1 as user1 and validation should reward user1", async() =>  {
        beforeBalance = await gcoinInstance.getBalance();

        result1 = await userInstance.createItem('hash1', user1Id);
        result2 = await validatorInstance.validateItem('hash1');

        console.log(result2);

        history = await userInstance.getHistory();

        console.log(history);

        afterBalance = await gcoinInstance.getBalance();

        console.log('User balance', beforeBalance.toNumber(), afterBalance.toNumber());
    });
});