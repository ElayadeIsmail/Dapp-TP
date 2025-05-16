// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ex3 {
    string public storedString;

    function setString(string memory str) public {
        storedString = str;
    }

    function getLength() public view returns (uint) {
        return bytes(storedString).length;
    }

    function getFirstChar() public view returns (bytes1) {
        return bytes(storedString)[0];
    }
}
