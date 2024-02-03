const { expect } = require("chai");
const { ethers } = require("hardhat");

const Tokens = (n) => {
	// converts 1000000*(10**decimals) wei into ether
	return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
	let token;
	// container where our code go..
	beforeEach(async () => {
		//fetch token from blockchain
		const Token = await ethers.getContractFactory("Token"); //fetches the contract
		token = await Token.deploy("Tabby's Token", "TABB", "1000000"); //deploys the contract to blockchain
	});

	describe("Deployment", () => {
		const name = "Tabby's Token";
		const symbol = "TABB";
		const decimals = 18;
		const totalSupply = Tokens("1000000");
		it("has correct name", async () => {
			//read token name
			const name = await token.name();
			//check the name is correct or not
			expect(name).to.equal(name);
		});
		it("has correct symbol", async () => {
			//read token name
			const symbol = await token.symbol();
			//check the name is correct or not
			expect(symbol).to.equal(symbol);
		});
		it("has correct decimals", async () => {
			const decimals = await token.decimals();
			expect(decimals).to.equal(decimals);
		});
		it("has correct Total supply", async () => {
			expect(await token.totalSupply()).to.equal(totalSupply);
		});
	});
});
