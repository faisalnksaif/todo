import * as actionTypes from "../action/actionTypes";

const initialState = {
  email: "",
  refreshToken: "",
  localId: "",
  idToken: "",
  error: "",
  loading: false,
  registered: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_ERROR:
      return signupErrorHandler(state, action);
    case actionTypes.CLEAR_SIGNUP_ERROR:
      return clearErrorHandler(state, action);
    case actionTypes.STORE_TOKEN:
      return storeTokenHandler(state, action);
    case actionTypes.SIGNUP:
      return signupHandler(state, action);
    case actionTypes.LOADING:
      return loadingHandler(state, action);
    default:
      return state;
  }
};

const signupErrorHandler = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error.message
  };
};

const storeTokenHandler = (state, action) => {
  return {
    ...state,
    email: action.authDetails.email,
    refreshToken: action.authDetails.refreshToken,
    localId: action.authDetails.localId,
    idToken: action.authDetails.idToken,
    error: "",
    loading: false
  };
};

const clearErrorHandler = (state, action) => {
  return {
    ...state,
    error: "",
    loading: false
  };
};

const loadingHandler = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const signupHandler = (state, action) => {
  return {
    ...state,
    error: "",
    registered: true,
    loading: false
  };
};

export default authReducer;
