const GreenCoin = artifacts.require("GreenCoin");
const User = artifacts.require("User");
const Validator = artifacts.require("Validator");

module.exports = function(deployer) {
    deployer.deploy(Validator)
};
