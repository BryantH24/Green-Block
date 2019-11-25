pragma solidity ^0.5.11;

import "./greencoin.sol";

contract User is GreenCoin {
    struct Item {
        uint id;
        address creator;
        bool isValidated;
    }

    mapping (uint => Item) idToItem;

    function createItem(uint qrHash) public {
        // TODO: Generate new hash for item based on qrHash (or use qrHash as itemId)

        // Create item based on new hash and map to user
        idToItem[qrHash] = Item(qrHash, msg.sender, false);
    }

    function getHistory() public view {

    }
}