pragma solidity ^0.8.0;

contract Ex6 {
    uint[] public numbers;

    function addNumber(uint n) public {
        numbers.push(n);
    }

    function getAll() public view returns (uint[] memory) {
        return numbers;
    }

    function getAt(uint index) public view returns (uint) {
        require(index < numbers.length, "Out of bounds");
        return numbers[index];
    }
}
