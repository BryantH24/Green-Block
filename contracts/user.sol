pragma solidity >=0.5.11;

import "./greencoin.sol";

contract User is GreenCoin {
    struct Item {
        uint id;
        address creator;
        bool isValidated;
    }

    mapping(address => uint) userItemCount;
    mapping (uint => Item) idToItem;

    Item[] internal items;

    function createItem(string memory _qrHash, address _creator) public {
        // Generate new random id for item based on qrHash
        uint _itemId = uint(keccak256(abi.encodePacked(_qrHash)));

        require(idToItem[_itemId].id == 0, "Item with the given qr code already exists"); // TODO: generate event on failure

        // Create item based on new hash
        uint _id = items.push(Item(_itemId, _creator, false)) - 1;

        // Increment user item count
        userItemCount[_creator]++;

        // Map id to item
        idToItem[_itemId] = items[_id];
    }

    function markValid(uint _itemId) public {
        idToItem[_itemId].isValidated = true;
    }

    function getHistory(address _userId) external view returns(uint[] memory, bool[] memory) {
        // NOTE: solidity does not support returning array of structs. Using workaround
        uint[] memory _ids = new uint[](userItemCount[_userId]);
        bool[] memory _status = new bool[](userItemCount[_userId]);

        Item memory memitem;

        uint counter = 0;

        for (uint i = 0; i < items.length; i++) {
            if (items[i].creator == _userId) {
                // NOTE: the mapping idToItem and items list do not refer to same instance of item
                memitem = idToItem[items[i].id];
                _ids[counter] = memitem.id;
                _status[counter] = memitem.isValidated;

                counter++;
            }
        }

        return (_ids, _status);
    }
}