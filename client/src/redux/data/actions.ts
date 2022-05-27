// log
import { Dispatch } from "redux";
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload: any) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload,
  };
};

const fetchDataFailed = (payload: any) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload,
  };
};

export const setPosition = (payload: any) => {
  return {
    type: "SET_POSITION",
    payload,
  };
};

export const fetchData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchDataRequest());

    try {
      const { blockchain } = store.getState();

      if (blockchain.smartContract) {
        const totalSupply = await blockchain.smartContract.totalSupply();

        // const cost = blockchain.smartContract.methods.cost().call();

        dispatch(
          fetchDataSuccess({
            totalSupply,
            // cost,
          })
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
