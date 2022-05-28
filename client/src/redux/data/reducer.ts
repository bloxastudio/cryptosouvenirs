import { Action } from "redux";

export interface DataState {
  loading: boolean;
  totalSupply: number;
  cost: number;
  error: boolean;
  errorMsg: string;
  position: GeolocationPosition | null;
}

const initialState: DataState = {
  loading: false,
  totalSupply: 0,
  cost: 0,
  error: false,
  errorMsg: "",
  position: null,
};

const dataReducer = (
  state = initialState,
  action: Action & { payload: any }
): DataState => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        totalSupply: action.payload.totalSupply,
        // cost: action.payload.cost,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case "SET_POSITION":
      return {
        ...initialState,
        position: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
