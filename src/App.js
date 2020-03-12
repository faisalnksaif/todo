import React from "react";
import firebase from "firebase";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/authReducer";
import Layout from "./containers/Layout/Layout";
import firebaseConfig from "./config/firebaseConfig";
import "./App.css";

function App() {
  firebase.initializeApp(firebaseConfig);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const reducers = combineReducers({
    auth: authReducer
  });

  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout></Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
