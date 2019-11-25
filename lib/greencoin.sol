pragma solidity ^0.5.11;

contract GreenCoin {
    mapping (address => uint) userToBalance;

    function _incrementBalance(address userId, uint amount) private {
        // TODO: Increment balance of userId by amount
    }

    function getBalance() public view {
        // TODO: Return green coins for user
    }
}