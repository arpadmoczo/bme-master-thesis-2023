const hre = require("hardhat");
require('dotenv').config();

async function main() {
  // Grab the contract factory
  const BravoNFTMinter = await ethers.getContractFactory("BravoNFTMinter");

  // Start deployment, returning a promise that resolves to a contract object
  const bravoNFTMinter = await BravoNFTMinter.deploy(); // Instance of the contract 
  console.log("Contract deployed to address:", bravoNFTMinter.address);
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });