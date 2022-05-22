import { Action, Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { connectToMetamask } from "@utils/metamask";
import { fetchData } from "../data/actions";
import { BlockchainState } from "./reducer";

const connectRequest = () => {
  return {
    type: "CONNECTION_REQUEST",
  };
};

const connectSuccess = (payload: any) => {
  return {
    type: "CONNECTION_SUCCESS",
    payload,
  };
};

const connectFailed = (payload: any) => {
  return {
    type: "CONNECTION_FAILED",
    payload,
  };
};

const updateAccountRequest = (payload: any) => {
  return {
    type: "UPDATE_ACCOUNT",
    payload,
  };
};

export const connect = () => {
  return async (dispatch: ThunkDispatch<BlockchainState, Action, Action>) => {
    dispatch(connectRequest());

    try {
      const { ethereum } = window;

      const { accounts, smartContract, web3 } = await connectToMetamask(
        ethereum
      );

      dispatch(
        connectSuccess({
          account: accounts[0],
          smartContract,
          web3: web3,
        })
      );

      // Add listeners start
      ethereum.on("accountsChanged", (accounts: any[]) => {
        dispatch(updateAccount(accounts[0]));
      });
      ethereum.on("chainChanged", () => {
        window.location.reload();
      });
      // Add listeners end
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        dispatch(connectFailed(error.message));
      }
    }
  };
};

export const updateAccount = (account: any) => {
  return async (dispatch: ThunkDispatch<BlockchainState, Action, Action>) => {
    dispatch(updateAccountRequest({ account: account }));
    dispatch(fetchData());
  };
};
