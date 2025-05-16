// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ex2 {
    function toWei(uint ethAmount) public pure returns (uint) {
        return ethAmount * 1 ether;
    }

    function toGwei(uint ethAmount) public pure returns (uint) {
        return ethAmount * 1 gwei;
    }
}