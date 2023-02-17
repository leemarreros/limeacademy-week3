import { ethers } from "hardhat";

export async function main() {
  const [deployer] = await ethers.getSigners();

  const NFT_factory = await ethers.getContractFactory("NFT");
  const nft = await NFT_factory.deploy();
  var nftTx = await nft.deployed();
  console.log(`The NFT contract is deployed to ${nft.address}`);
  await nftTx.deployTransaction.wait(5);

  const uri =
    "https://ipfs.io/ipfs/QmNuRgAGAexVrZEJt7cUqbKpQxUq9ru7vHxrXhVHsxoZEv";

  var tx = await nft.safeMint(uri, deployer.address);
  await tx.wait();

  const uriFromContract = await nft.tokenURI(1);
  console.log("The toke URI is ", uriFromContract);

  const owner = await nft.ownerOf(1);
  console.log("The owner of the token with id 1 is ", owner);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
