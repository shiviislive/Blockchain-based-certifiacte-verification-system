require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // Add other networks via environment variables if needed (e.g. Goerli, Sepolia)
    // goerli: {
    //   url: process.env.GOERLI_RPC_URL || "",
    //   accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    // }
  }
};
