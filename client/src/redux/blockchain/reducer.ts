import { Action } from "redux";
import { CryptoSouvenirs } from "../../../../blockchain/src/types/contracts/CryptoSouvenirs";

export interface BlockchainState {
  loading: boolean;
  account: string | null;
  smartContract: CryptoSouvenirs | null;
  errorMsg: string;
}

const initialState: BlockchainState = {
  loading: false,
  account: null,
  smartContract: null,
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
      const { account, smartContract } = action.payload;

      return {
        ...state,
        loading: false,
        account,
        smartContract,
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
