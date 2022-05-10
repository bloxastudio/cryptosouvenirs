import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { CryptoSouvenirs } from "../../src/types";
import { CryptoSouvenirs__factory } from "../../src/types";

task("deploy:CryptoSouvenirs").setAction(async function (
  _: TaskArguments,
  { ethers }
) {
  const cryptoSouvenirsFactory: CryptoSouvenirs__factory = <
    CryptoSouvenirs__factory
  >await ethers.getContractFactory("CryptoSouvenirs");

  const name = "CryptoSouvenirsNFT";
  const symbol = "CSV";
  const greeting = "Hello, world!";
  const cryptoSouvenirs: CryptoSouvenirs = <CryptoSouvenirs>(
    await cryptoSouvenirsFactory.deploy(name, symbol, greeting)
  );
  await cryptoSouvenirs.deployed();

  console.log("Greeter deployed to: ", cryptoSouvenirs.address);
});
