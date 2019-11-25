pragma solidity ^0.5.11;

import "./greencoin.sol";

contract Validator is GreenCoin {
    uint reward = 5; // Represents the coins user will receive on successful validation

    function _rewardUser(address userId) private {
        // TODO: Increment balance
    }

    function validateItem(uint itemId) public {
        // TODO: Retrieve item and mark valid

        // TODO: Call reward
    }
}