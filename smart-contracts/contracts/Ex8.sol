// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ex8 {
    address public lastSender;
    uint public lastValue;

    function sendEther() public payable {
        lastSender = msg.sender;
        lastValue = msg.value;
    }
}