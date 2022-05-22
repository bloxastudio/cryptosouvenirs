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

export const fetchData = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      // let cost = await store
      //   .getState()
      //   .blockchain.smartContract.methods.cost()
      //   .call();

      dispatch(
        fetchDataSuccess({
          totalSupply,
          // cost,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
