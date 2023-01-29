import { legacy_createStore , combineReducers , applyMiddleware } from "redux";
import {reducer as AuthReducer} from "./AuthReducer/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({AuthReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));