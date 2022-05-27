import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { CryptoSouvenirs } from "../../build/types";
import { CryptoSouvenirs__factory } from "../../build/types";

task("deploy:CryptoSouvenirs").setAction(async function (
  _: TaskArguments,
  { ethers }
) {
  const cryptoSouvenirsFactory: CryptoSouvenirs__factory = <
    CryptoSouvenirs__factory
  >await ethers.getContractFactory("CryptoSouvenirs");

  const name = "CryptoSouvenirsNFT";
  const symbol = "CSV";
  const metaDataBaseCID =
    "ipfs://QmVmmBLSL7XsYm58sQVNPkfQWafEpk26ZcuvuzxTKjDbme/";

  const cryptoSouvenirs: CryptoSouvenirs = <CryptoSouvenirs>(
    await cryptoSouvenirsFactory.deploy(name, symbol, metaDataBaseCID)
  );
  await cryptoSouvenirs.deployed();

  console.log("CryptoSouvenirs deployed to: ", cryptoSouvenirs.address);

  await cryptoSouvenirs.mint(1);

  await cryptoSouvenirs.mint(2);

  await cryptoSouvenirs.mint(3);

  await cryptoSouvenirs.mint(4);

  console.log(await cryptoSouvenirs.tokenURI(1));
  console.log(await cryptoSouvenirs.tokenURI(2));
  console.log(await cryptoSouvenirs.tokenURI(3));
  console.log(await cryptoSouvenirs.tokenURI(4));
});
