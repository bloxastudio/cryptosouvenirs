import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import { config as dotenvConfig } from "dotenv";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";
import { resolve } from "path";
import "solidity-coverage";
import "./tasks/accounts";
import "./tasks/deploy";

dotenvConfig({ path: resolve(__dirname, "./.env") });

const chainIds = {
  hardhat: 1337,
  rinkeby: 4,
};

const enableRinkeby = process.env.ALCHEMY_RINKEBY_URL;

const config: HardhatUserConfig = {
  solidity: "0.8.14",
  defaultNetwork: "hardhat",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./build/cache",
    artifacts: "./build/artifacts",
  },
  networks: {
    hardhat: {
      chainId: chainIds.hardhat,
    },
  },
  typechain: {
    outDir: "./build/types",
    target: "ethers-v5",
  },
  gasReporter: {
    currency: "USD",
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    src: "./contracts",
  },
};

if (enableRinkeby && config.networks) {
  config.networks.rinkeby = {
    url: `${process.env.ALCHEMY_RINKEBY_URL}`,
    accounts: [`${process.env.PRIVATE_KEY}`],
  };
}

export default config;
