import reducer from "../reducer";
import thunk from "./redux-thunk";
import reporter from "./redux-reporter";
import { createStore, applyMiddleware, compose } from "redux";

let appStoreCreate = () =>
  createStore(reducer, undefined, compose(applyMiddleware(thunk, reporter)));

export default appStoreCreate;
