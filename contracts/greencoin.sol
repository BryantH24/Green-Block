pragma solidity 0.5.11;

contract GreenCoin {
    mapping (address => uint) userToBalance;

    function incrementBalance(address _userId, uint _amount) public {
        // Increment balance of userId by given amount
        userToBalance[_userId] += _amount;
    }

    function getBalance(address _userId) public view returns (uint) {
        // Return green coins for user
        return userToBalance[_userId];
    }
}