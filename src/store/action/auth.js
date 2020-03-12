import * as actionTypes from "./actionTypes";
import axios from "axios";
import firebase from "firebase";

export const setStoreToken = authDetails => {
  return {
    type: actionTypes.STORE_TOKEN,
    authDetails: authDetails
  };
};

export const setSignupError = error => {
  return {
    type: actionTypes.SIGNUP_ERROR,
    error: error
  };
};

export const setSignup = details => {
  return {
    type: actionTypes.SIGNUP,
    details: details
  };
};

export const setClearStatus = () => {
  return {
    type: actionTypes.CLEAR_SIGNUP_ERROR
  };
};
export const setLoading = () => {
  return {
    type: actionTypes.LOADING
  };
};

export const signIn = (email, password) => {
  return dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const signUp = (email, password) => {
  return dispatch => {
    dispatch(setLoading());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        dispatch(setStoreToken(response));
      })
      .catch(error => {
        console.log(error);
        dispatch(setSignupError(error));
      });
  };
};
