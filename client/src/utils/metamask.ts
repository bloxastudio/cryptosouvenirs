import { CryptoSouvenirs } from "./../../../blockchain/src/types/contracts/CryptoSouvenirs";
import Web3 from "web3";
import CONFIG from "../config.json";
import { abi } from "../../../blockchain/build/artifacts/contracts/CryptoSouvenirs.sol/CryptoSouvenirs.json";

export const connectToMetamask = async (provider: any) => {
  const metamaskIsInstalled = provider && provider.isMetaMask;
  if (metamaskIsInstalled) {
    const web3 = new Web3(provider);

    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const networkId = await provider.request({
        method: "net_version",
      });
      console.log("net_version: ", networkId);
      if (String(networkId) === String(CONFIG.NETWORK.ID)) {
        const smartContract = new web3.eth.Contract(
          abi,
          CONFIG.CONTRACT_ADDRESS
        ) as CryptoSouvenirs;

        return {
          accounts,
          smartContract,
          web3,
        };
      } else {
        throw new Error(`Change network to ${CONFIG.NETWORK.NAME}.`);
      }
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  } else {
    throw new Error("Install Metamask.");
  }
};
