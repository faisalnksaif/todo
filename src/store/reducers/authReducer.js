import * as actionTypes from "../action/actionTypes";

const initialState = {
  email: "",
  refreshToken: "",
  idToken: "",
  error: "",
  loading: false,
  registered: false
};

const authReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP:
      return signupHandler(state, action);
    case actionTypes.SIGNUP_ERROR:
      return signupErrorHandler(state, action);
    case actionTypes.CLEAR_SIGNUP_ERROR:
      return clearErrorHandler(state, action);
    case actionTypes.STORE_TOKEN:
      return storeTokenHandler(state, action);
    case actionTypes.LOGOUT:
      return logoutHandler(state, action);
    case actionTypes.LOADING:
      return loadingHandler(state, action);
    case actionTypes.GET_LOGIN_STATUS:
      return loginStatusHandler(state, action);
    default:
      return state;
  }
};

const signupErrorHandler = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  };
};

const storeTokenHandler = (state, action) => {
  const authState = {
    ...state,
    email: action.authDetails.user.email,
    refreshToken: action.authDetails.user.refreshToken,
    idToken: action.authDetails.user.uid,
    error: "",
    loading: false
  };
  localStorage.setItem("AUTH_TOKEN", JSON.stringify(authState));

  return authState;
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

const logoutHandler = (state, action) => {
  return {
    ...state,
    email: "",
    refreshToken: "",
    idToken: "",
    error: "",
    loading: false,
    registered: false
  };
};

const loginStatusHandler = (state, action) => {
  const storedAuthState = localStorage.getItem("AUTH_TOKEN");
  try {
    const parsedAuthState = JSON.parse(storedAuthState);
    return {
      ...state,
      ...parsedAuthState
    };
  } catch (ex) {
    return {
      ...state
    };
  }
};

export default authReducer;
