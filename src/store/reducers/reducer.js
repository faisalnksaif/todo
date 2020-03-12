import * as actionTypes from "../action/actionTypes";

const initialState = {
  auth: {
    idToken: "",
    email: "",
    refreshToken: "",
    expiresIn: "",
    localId: ""
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TOKEN:
      return "";
    default:
      return state;
  }
};

export default reducer;
