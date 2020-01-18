pragma solidity 0.5.11;

contract GreenCoin {
    mapping (address => uint) userToBalance;

    function _incrementBalance(address _userId, uint _amount) internal {
        // Increment balance of userId by given amount
        userToBalance[_userId] += _amount;
    }

    function getBalance() public view returns (uint) {
        // Return green coins for user
        return userToBalance[msg.sender];
    }
}