import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { Hackathon } from "../src/types";
import { Signers } from "./types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("Hackathon", function () {
    beforeEach(async function () {
      const name = "HackathonNFT";
      const symbol = "UGN";
      const greeting = "Hello, world!";
      const hackathonArtifact: Artifact = await artifacts.readArtifact(
        "Hackathon"
      );
      console.log(this.hackathon);
      this.hackathon = <Hackathon>(
        await waffle.deployContract(this.signers.admin, hackathonArtifact, [
          name,
          symbol,
          greeting,
        ])
      );
    });

    it("should return the new greeting once it's changed", async function () {
      expect(await this.hackathon.connect(this.signers.admin).greet()).to.equal(
        "Hello, world!"
      );

      await this.hackathon.setGreeting("Bonjour, le monde!");
      expect(await this.hackathon.connect(this.signers.admin).greet()).to.equal(
        "Bonjour, le monde!"
      );
    });
  });
});
