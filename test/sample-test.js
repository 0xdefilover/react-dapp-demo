const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const SampleToken = await ethers.getContractFactory("SampleToken");
    const sampletoken = await SampleToken.deploy("SampleToken", "SPL");
    await sampletoken.deployed();

    expect(await sampletoken.name()).to.equal("SampleToken");
  });
});
