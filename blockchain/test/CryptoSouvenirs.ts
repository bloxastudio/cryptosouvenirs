import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { expect } from "chai";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import type { CryptoSouvenirs } from "../build/types";
import { Signers } from "./types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.randomGuy = signers[1];
  });

  describe("CryptoSouvenirs", function () {
    beforeEach(async function () {
      const name = "CryptoSouvenirsNFT";
      const symbol = "CSV";
      const baseUri = "ipfs://asdasd123/";
      const cryptoSouvenirsArtifact: Artifact = await artifacts.readArtifact(
        "CryptoSouvenirs"
      );
      this.cryptoSouvenirs = <CryptoSouvenirs>(
        await waffle.deployContract(
          this.signers.admin,
          cryptoSouvenirsArtifact,
          [name, symbol, baseUri]
        )
      );
    });

    it("should return the name and the symbol of the ERC721 token.", async function () {
      expect(await this.cryptoSouvenirs.name()).to.equal("CryptoSouvenirsNFT");

      expect(await this.cryptoSouvenirs.symbol()).to.equal("CSV");
    });

    it("should return the correct token Uri", async function () {
      await this.cryptoSouvenirs.connect(this.signers.admin).mint(1);
      await this.cryptoSouvenirs.connect(this.signers.admin).mint(2);
      await this.cryptoSouvenirs.connect(this.signers.admin).mint(3);

      expect(await this.cryptoSouvenirs.tokenURI(1)).to.equal(
        "ipfs://asdasd123/1.json"
      );

      expect(await this.cryptoSouvenirs.tokenURI(2)).to.equal(
        "ipfs://asdasd123/2.json"
      );

      expect(await this.cryptoSouvenirs.tokenURI(3)).to.equal(
        "ipfs://asdasd123/3.json"
      );
    });

    it("cost should be set to 0.4", async function () {
      const oldPrice = ethers.utils.parseEther("0.05");
      const newPrice = ethers.utils.parseEther("0.04");

      expect(await this.cryptoSouvenirs.cost()).to.equal(oldPrice);

      await this.cryptoSouvenirs.connect(this.signers.admin).setCost(newPrice);

      expect(await this.cryptoSouvenirs.cost()).to.equal(newPrice);
    });

    it("should mint a token to the random guy", async function () {
      expect(
        await this.cryptoSouvenirs.balanceOf(this.signers.randomGuy.address)
      ).to.equal(0);

      await this.cryptoSouvenirs.connect(this.signers.randomGuy).mint(1, {
        value: ethers.utils.parseEther("0.05"),
      });

      expect(
        await this.cryptoSouvenirs.balanceOf(this.signers.randomGuy.address)
      ).to.equal(1);
    });

    it("contract should have the correct balance after withdraw", async function () {
      expect(
        await ethers.provider.getBalance(this.cryptoSouvenirs.address)
      ).to.equal(0);

      await this.cryptoSouvenirs.connect(this.signers.randomGuy).mint(1, {
        value: ethers.utils.parseEther("0.05"),
      });

      expect(
        await ethers.provider.getBalance(this.cryptoSouvenirs.address)
      ).to.equal(ethers.utils.parseEther("0.05"));

      await this.cryptoSouvenirs.withdraw();

      expect(
        await ethers.provider.getBalance(this.cryptoSouvenirs.address)
      ).to.equal(0);
    });
  });
});
