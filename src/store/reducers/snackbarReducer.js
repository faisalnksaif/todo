import * as actionTypes from "../action/actionTypes";

const initialState = {
  label: ""
};

const snackBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SNACKBAR.LABEL:
      return snackBarLabelHandler(state, action);
    default:
      return state;
  }
};

const snackBarLabelHandler = (state, action) => {
  return {
    ...state,
    label: action.label
  };
};

export default snackBarReducer;
