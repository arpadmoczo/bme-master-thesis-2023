require("@nomicfoundation/hardhat-toolbox");
//require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

const REACT_APP_ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url: REACT_APP_ALCHEMY_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts" //it must be changed
  },
  mocha: {
    timeout: 40000
  }
}
