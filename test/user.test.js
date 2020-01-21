var User = artifacts.require("./User.sol");

contract('User', (accounts) => {

    var user1Id = accounts[0];
    var userInstance;

    beforeEach('setup contract for each test', async() => {
        userInstance = await User.deployed()
    })

    it("Should create two items from hash1 and hash2 as user1 and return item history", async() =>  {
        result1 = await userInstance.createItem('hash1', user1Id);
        result2 = await userInstance.createItem('hash2', user1Id);

        result3 = await userInstance.idToItem.call('35264242174310653739930584824650794736281833835849161548889533775774637086175')

        history = await userInstance.getHistory(user1Id);

        itemIds = history['0']
        itemValidStats = history['1']

        assert.equal(user1Id, result3.creator);

        assert.equal(itemIds.length, 2);
        assert.equal(itemValidStats.length, 2);

        assert.equal(itemIds[0].toString(), '35264242174310653739930584824650794736281833835849161548889533775774637086175');
        assert.equal(itemValidStats[0], false);

        assert.equal(itemIds[1].toString(), '111849627418221318238515847454524426800251613036203539924234224863086506935880');
        assert.equal(itemValidStats[1], false);
    });
});