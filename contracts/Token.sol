// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;
import "hardhat/console.sol";

contract Token {
    string public name;
    string public symbol;
    uint public decimals = 18;
    uint public totalSupply; //equivalent to 1000000 * 10^decimals
    mapping(address => uint256) public balanceOf; //maps the balance of each address

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(string memory _name, string memory _symbol, uint _totalsupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _totalsupply * (10 ** decimals);
        balanceOf[msg.sender] = totalSupply;
    }
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender]>=_value);
        require(_to != address(0));
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] +=_value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
}
