import { Action } from "redux";
import { CryptoSouvenirs } from "../../../../blockchain/src/types/contracts/CryptoSouvenirs";

export interface BlockchainState {
  loading: boolean;
  account: any;
  smartContract: CryptoSouvenirs | null;
  web3: any;
  errorMsg: string;
}

const initialState: BlockchainState = {
  loading: false,
  account: null,
  smartContract: null,
  web3: null,
  errorMsg: "",
};

const blockchainReducer = (
  state = initialState,
  action: Action & { payload: any }
): BlockchainState => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS": {
      const { account, smartContract, web3 } = action.payload;

      return {
        ...state,
        loading: false,
        account,
        smartContract,
        web3,
      };
    }
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    case "UPDATE_ACCOUNT": {
      const { account } = action.payload;

      return {
        ...state,
        account,
      };
    }
    default:
      return state;
  }
};

export default blockchainReducer;
