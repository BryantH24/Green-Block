pragma solidity ^0.5.11;

pragma experimental ABIEncoderV2;

import "./greencoin.sol";

contract User is GreenCoin {
    struct Item {
        uint id;
        address creator;
        bool isValidated;
    }

    mapping (uint => Item) idToItem;
    Item[] internal items;

    function createItem(uint qrHash) public {
        // TODO: Generate new hash for item based on qrHash (or use qrHash as itemId)

        // Create item based on new hash
        uint _id = items.push(Item(qrHash, msg.sender, false)) - 1;

        // Map id to item
        idToItem[qrHash] = items[_id];
    }

    function getHistory() external view returns(Item[] memory) {
        Item[] memory _itemHistory;
        uint counter = 0;

        for (uint i = 0; i < items.length; i++) {
            if (items[i].creator == msg.sender) {
                _itemHistory[counter] = items[i];
                counter++;
            }
        }

        return _itemHistory;
    }
}