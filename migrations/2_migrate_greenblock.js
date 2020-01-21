const GreenCoin = artifacts.require("GreenCoin");
const User = artifacts.require("User");
const Validator = artifacts.require("Validator");

module.exports = function(deployer) {

    deployer.deploy(GreenCoin)
        // Wait until the storage contract is deployed
        .then(() => GreenCoin.deployed())
        // Deploy the InfoManager contract, while passing the address of the
        // Storage contract
        .then(() => deployer.deploy(User, GreenCoin.address))
        .then(() => User.deployed())
        .then(() => deployer.deploy(Validator, GreenCoin.address, User.address));
};
