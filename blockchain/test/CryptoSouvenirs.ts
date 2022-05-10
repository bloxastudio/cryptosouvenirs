import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { CryptoSouvenirs } from "../src/types";
import { Signers } from "./types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("CryptoSouvenirs", function () {
    beforeEach(async function () {
      const name = "CryptoSouvenirsNFT";
      const symbol = "CSV";
      const greeting = "Hello, world!";
      const cryptoSouvenirsArtifact: Artifact = await artifacts.readArtifact(
        "CryptoSouvenirs"
      );
      console.log(this.cryptoSouvenirs);
      this.cryptoSouvenirs = <CryptoSouvenirs>(
        await waffle.deployContract(
          this.signers.admin,
          cryptoSouvenirsArtifact,
          [name, symbol, greeting]
        )
      );
    });

    it("should return the new greeting once it's changed", async function () {
      expect(
        await this.cryptoSouvenirs.connect(this.signers.admin).greet()
      ).to.equal("Hello, world!");

      await this.cryptoSouvenirs.setGreeting("Bonjour, le monde!");
      expect(
        await this.cryptoSouvenirs.connect(this.signers.admin).greet()
      ).to.equal("Bonjour, le monde!");
    });
  });
});
