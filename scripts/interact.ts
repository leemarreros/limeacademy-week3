import "dotenv/config";
import { providers } from "ethers";
import { ethers } from "hardhat";

async function main() {
    const { MUMBAI_TESNET_URL } = process.env;
    const [deployer] = await ethers.getSigners();

    const ETHWrapperFactory = await ethers.getContractFactory("ETHWrapper");

    const balance = await deployer.getBalance();
    console.log(ethers.utils.formatEther(balance));

    const wrapValue = ethers.utils.parseEther("0.1");

    const ETHWrapperContract = await ETHWrapperFactory.attach(
        "0xD7A476861fabB01b826e327Acc6Cfe0E81df184D"
    );

    console.log(ETHWrapperContract.address);

    const WETHFactory = await ethers.getContractFactory("WETH");
    const wethAddress = await ETHWrapperContract.WETHToken();
    const WETHContract = await WETHFactory.attach(wethAddress);


    // WRAP
    // const tx = await ETHWrapperContract.wrap({ value: wrapValue });
    // await tx.wait();

    // UNWRAP
    const approveTx = await WETHContract.approve(ETHWrapperContract.address, wrapValue)
    await approveTx.wait();
    const unwrapTx = await ETHWrapperContract.unwrap(wrapValue);
    await unwrapTx.wait();

    const provider = new providers.JsonRpcProvider(MUMBAI_TESNET_URL);
    let contractETHBalance = await provider.getBalance(
        ETHWrapperContract.address
    );
    console.log(
        "Contract ETH balance after wrapping:",
        contractETHBalance.toString()
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
