import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";
import { Hackathon } from "../../src/types";
import { Hackathon__factory } from "../../src/types";

task("deploy:Hackathon").setAction(async function (
  _: TaskArguments,
  { ethers }
) {
  const hackathonFactory: Hackathon__factory = <Hackathon__factory>(
    await ethers.getContractFactory("Hackathon")
  );

  const name = "HackathonNFT";
  const symbol = "HCK";
  const greeting = "Hello, world!";
  const hackathon: Hackathon = <Hackathon>(
    await hackathonFactory.deploy(name, symbol, greeting)
  );
  await hackathon.deployed();

  console.log("Greeter deployed to: ", hackathon.address);
});
