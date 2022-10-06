import { combineReducers } from "redux";
import amountReducer from "./amountReducer";

const redusers = combineReducers({
    amount: amountReducer
})

export default redusers;