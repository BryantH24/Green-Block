pragma solidity ^0.5.11;

contract User {
    struct Item {
        uint id;
        address creator;
        bool isValidated;
    }

    mapping (uint => Item) idToItem;
    mapping (address => uint) userToBalance;

    function createItem(uint qrHash) public {
        // TODO: Generate new hash for item based on qrHash (or use qrHash as itemId)

        // TODO: Create item based on new hash

        // TODO: Store item in itemToUser mapping
    }

    function getHistory() public view {

    }

    function getBalance() public view {
        // TODO: retrieve and return user balance
    }
}