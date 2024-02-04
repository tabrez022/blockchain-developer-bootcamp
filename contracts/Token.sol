// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint public decimals = 18;
    uint public totalSupply; //equivalent to 1000000 * 10^decimals
    mapping(address => uint256) public balanceOf; //maps the balance of each address

    constructor(string memory _name, string memory _symbol, uint _totalsupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalsupply * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }
}
