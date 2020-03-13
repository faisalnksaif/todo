import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/action/auth";
import TextField from "@material-ui/core/TextField";
import { Button, CircularProgress } from "@material-ui/core";
import * as snackbarActions from "../../store/action/snackbar";
import "./Login.css";
import {
  inputChangeHandler,
  validateForm,
  isFormValid
} from "../../utils/utils";

export const login = React.memo(props => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [formElements, setFormElements] = useState([
    {
      name: "Email",
      value: "",
      placeholder: "Email",
      type: "text",
      validations: {
        required: true,
        email: true
      },
      errorMessage: ""
    },
    {
      name: "Password",
      value: "",
      placeholder: "Password",
      type: "password",
      validations: {
        required: true,
        minLength: 6
      },
      errorMessage: ""
    }
  ]);

  useEffect(() => {
    dispatch(actions.getLoginStatus())
  }, []);

  useEffect(() => {
    if (!!auth.idToken) {
      dispatch(snackbarActions.setSnackBarLabel("Login Success"));
      props.history.push("/");
    }
    if (!!auth.error) {
      dispatch(snackbarActions.setSnackBarLabel(auth.error));
    }
  }, [auth]);

  const loginHandler = () => {
    setFormElements(validateForm([...formElements]));
    if (isFormValid(formElements)) {
      dispatch(actions.signIn(formElements[0].value, formElements[1].value));
    }
  };

  const formElementTemplate = formElements.map((element, index) => {
    return (
      <TextField
        key={index}
        value={element.value}
        error={!!element.errorMessage}
        helperText={element.errorMessage}
        type={element.type}
        onChange={event => {
          setFormElements(
            inputChangeHandler(event.target.value, element, formElements)
          );
        }}
        label={element.placeholder}
      />
    );
  });

  return (
    <div className="Login">
      <div className="center">
        {formElementTemplate}
        <div>
          {!auth.loading ? (
            <Button
              onClick={() => {
                loginHandler();
              }}
              color="primary"
            >
              SIGN IN
            </Button>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </div>
  );
});

export default login;
