/// <reference types="vite/client" />

interface Window {
  ethereum: any;
  __REDUX_DEVTOOLS_EXTENSION__: any;
}

class Web3EthContract {
  constructor(jsonInterface: any, address: string);
  static setProvider: (provider: any) => void;
}

declare module "web3-eth-contract" {
  export = Web3EthContract;
}

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// API models
interface AvailableNFT {
  rowKey: string;
  latitude: number;
  longitude: number;
}
