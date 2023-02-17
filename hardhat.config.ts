import "dotenv/config";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

task("deploy", "Deploys the contract", async (taskArgs, hre) => {
  const ETHWrapperFactory = await hre.ethers.getContractFactory("ETHWrapper"); // 
  const ETHWrapperContract = await ETHWrapperFactory.deploy();
  console.log('Waiting for ETHWrapperContract deployment...', ETHWrapperContract.address);
  await ETHWrapperContract.deployed();

});


const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.INFURA_URL_GOERLI,
      chainId: 5,
      accounts: [
        process.env.PRIVATE_KEY || "",
      ],
    },
    mumbai: {
      url: process.env.MUMBAI_TESNET_URL,
      accounts: [
        process.env.PRIVATE_KEY || "",
      ],
      timeout: 0,
      gas: "auto",
      gasPrice: "auto",
    },
  },
};

export default config;
