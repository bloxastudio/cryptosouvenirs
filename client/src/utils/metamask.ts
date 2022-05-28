import { ethers } from "ethers";
import CONFIG from "../config.json";
import { abi } from "../../../blockchain/build/artifacts/contracts/CryptoSouvenirs.sol/CryptoSouvenirs.json";

export const connectToMetamask = async () => {
  const metamaskIsInstalled = window.ethereum && window.ethereum.isMetaMask;
  if (metamaskIsInstalled) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      const accounts: string[] = await provider.send("eth_requestAccounts", []);
      const networkId: string = await provider.send("net_version", []);

      console.log("net_version: ", networkId);

      if (String(networkId) === String(CONFIG.NETWORK.ID)) {
        const smartContract = new ethers.Contract(
          CONFIG.CONTRACT_ADDRESS,
          abi,
          provider
        );

        return {
          accounts,
          smartContract,
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
