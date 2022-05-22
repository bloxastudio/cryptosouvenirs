import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import type { Fixture } from "ethereum-waffle";
import type { CryptoSouvenirs } from "../src/types";

declare module "mocha" {
  export interface Context {
    cryptoSouvenirs: CryptoSouvenirs;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  randomGuy: SignerWithAddress;
}
