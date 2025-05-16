// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Shape {
    function area() public view virtual returns (uint);
}

contract Rectangle is Shape {
    uint width;
    uint height;

    constructor(uint _w, uint _h) {
        width = _w;
        height = _h;
    }

    function area() public view override returns (uint) {
        return width * height;
    }
}
