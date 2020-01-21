pragma solidity 0.5.11;

import "./greencoin.sol";
import "./user.sol";

contract Validator is GreenCoin, User {
    uint reward = 5; // Represents the coins user will receive on successful validation

    function validateItem(string memory _qrHash) public {
        // Generate new random id for item based on qrHash
        uint _itemId = uint(keccak256(abi.encodePacked(_qrHash)));

        // Retrieve item and mark valid
        Item storage item = idToItem[_itemId];

        item.isValidated = true;

        // Reward user
        _incrementBalance(item.creator, reward);
    }
}