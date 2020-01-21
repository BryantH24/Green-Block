pragma solidity 0.5.11;

import "./greencoin.sol";
import "./user.sol";

contract Validator is GreenCoin, User {
    uint reward = 5; // Represents the coins user will receive on successful validation

    GreenCoin GCInstance;
    User UInstance;

    constructor(address _gc, address _u) public {
        GCInstance = GreenCoin(_gc);
        UInstance = User(_u);
    }

    function validateItem(string memory _qrHash) public {
        // Generate same item id based on qrHash
        uint _itemId = uint(keccak256(abi.encodePacked(_qrHash)));

        // Retrieve item and mark valid
        (, address _creator, bool _validState) = UInstance.idToItem(_itemId);

        if (_validState == false) {
            // Mark item as validated
            UInstance.markValid(_itemId);

            // Reward user
            GCInstance.incrementBalance(_creator, reward);
        }
    }
}