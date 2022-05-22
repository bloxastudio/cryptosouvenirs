import Web3EthContract from "web3-eth-contract";
import Web3 from "web3";
import CONFIG from "../config.json";
import abi from "../abi.json";

export const connectToMetamask = async (provider: any) => {
  const metamaskIsInstalled = provider && provider.isMetaMask;
  if (metamaskIsInstalled) {
    Web3EthContract.setProvider(provider);
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
        const smartContract = new Web3EthContract(abi, CONFIG.CONTRACT_ADDRESS);

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
