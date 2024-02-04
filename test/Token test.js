const { expect } = require("chai");
const { ethers } = require("hardhat");

const Tokens = (n) => {
	// converts 1000000*(10**decimals) wei into ether
	return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
	let token, deployer, accounts;
	// container where our code go..
	beforeEach(async () => {
		//fetch token from blockchain
		const Token = await ethers.getContractFactory("Token"); //fetches the contract
		token = await Token.deploy("Tabby's Token", "TABB", "1000000"); //deploys the contract to blockchain
		accounts = await ethers.getSigners();
		deployer = accounts[0];
	});

	describe("Deployment", () => {
		const Name = "Tabby's Token";
		const Symbol = "TABB";
		const Decimals = 18;
		const totalSupply = Tokens("1000000");
		it("has correct name", async () => {
			//read token name
			const name = await token.name();
			//check the name is correct or not
			expect(name).to.equal(Name);
		});
		it("has correct symbol", async () => {
			//read token name
			const symbol = await token.symbol();
			//check the name is correct or not
			expect(symbol).to.equal(Symbol);
		});
		it("has correct decimals", async () => {
			const decimals = await token.decimals();
			expect(decimals).to.equal(Decimals);
		});
		it("has correct Total supply", async () => {
			expect(await token.totalSupply()).to.equal(totalSupply);
		});
		it("asigns total supply to the deployer", async () => {
			expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
		});
	});
});
