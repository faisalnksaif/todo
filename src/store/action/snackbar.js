import * as actionTypes from "./actionTypes";

export const setSnackBarLabel = label => {
  return {
    type: actionTypes.SNACKBAR.LABEL,
    label: label
  };
};
