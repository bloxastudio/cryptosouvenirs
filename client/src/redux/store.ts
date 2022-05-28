import {
  applyMiddleware,
  compose,
  createStore,
  combineReducers,
  StoreEnhancer,
} from "redux";
import thunk from "redux-thunk";
import blockchainReducer, { BlockchainState } from "./blockchain/reducer";
import dataReducer, { DataState } from "./data/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

export interface AppState {
  blockchain: BlockchainState;
  data: DataState;
}

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
});

const middleware = [thunk];
let composeEnhancers: StoreEnhancer;
if (window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeEnhancers = compose(
    applyMiddleware(...middleware),
    composeWithDevTools()
  );
} else {
  composeEnhancers = compose(applyMiddleware(...middleware));
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
