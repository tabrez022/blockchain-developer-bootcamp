const { expect } = require("chai");
const { ethers } = require("hardhat");

const Tokens = (n) => {
	// converts 1000000*(10**decimals) wei into ether
	return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
	let token, deployer, accounts, receiver;
	// container where our code go..
	beforeEach(async () => {
		//fetch token from blockchain
		const Token = await ethers.getContractFactory("Token"); //fetches the contract
		token = await Token.deploy("Tabby's Token", "TABB", "1000000"); //deploys the contract to blockchain
		accounts = await ethers.getSigners();
		deployer = accounts[0];
		receiver = accounts[1];
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
		it("assigns total supply to the deployer", async () => {
			expect(await token.balanceOf(deployer.address)).to.equal(totalSupply);
		});
	});
	describe("Sending Token", () => {
		let amount, Transaction, result;
		beforeEach(async () => {
			amount = Tokens("100");
			Transaction = await token
				.connect(deployer)
				.transfer(receiver.address, amount);
			result = await Transaction.wait();
		});
		describe("Success", () => {
			it("transfer token balances", async () => {
				//Ensure tokens were transferred ( Balance changed)
				expect(await token.balanceOf(deployer.address)).to.equal(
					Tokens(999900)
				);
				expect(await token.balanceOf(receiver.address)).to.equal(amount);
			});
			it("emits a Transfer event", async () => {
				const event = result.events[0];
				// console.log(event); // To see all the data
				expect(event.event).to.equal("Transfer");
				const args = event.args;
				expect(args.from).to.equal(deployer.address);
				expect(args.to).to.equal(receiver.address);
				expect(args.value).to.equal(amount);
			});
		});

		describe("Failure", () => {
			it("rejects insufficient balances", async () => {
				//transfer more tokens than deployer has
				const invalidamount = Tokens(100000000);
				await expect(
					token.connect(deployer).transfer(receiver.address, invalidamount)
				).to.be.reverted;
			});
			it("rejects invalid recipent", async () => {
				const amount = Tokens(100);
				await expect(
					token
						.connect(deployer)
						.transfer("0x0000000000000000000000000000000000000000", amount)
				).to.be.reverted;
			});
		});
	});
});
