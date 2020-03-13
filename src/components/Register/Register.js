import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/action/auth";
import * as snackbarActions from "../../store/action/snackbar";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import {
  inputChangeHandler,
  validateForm,
  isFormValid
} from "../../utils/utils";
import "./Register.css";

export const register = React.memo(props => {
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
    },
    {
      name: "Confirm Password",
      value: "",
      placeholder: "Confirm Password",
      type: "password",
      validations: {
        required: true,
        minLength: 6
      },
      errorMessage: ""
    }
  ]);

  useEffect(() => {
    if (auth.error) {
      setSnackLabel(auth.error);
    } else if (auth.registered) {
      setSnackLabel("Registration Success, Please login");
      props.history.push("/login");
    }
  }, [auth, props.history]);

  const setSnackLabel = label => {
    dispatch(snackbarActions.setSnackBarLabel(label));
  };

  const handleSignup = () => {
    setFormElements(validateForm([...formElements]));
    if (isFormValid(formElements)) {
      dispatch(
        authActions.signUp(formElements[0].value, formElements[1].value)
      );
    }
  };

  const formElementsTemplate = formElements.map((element, index) => {
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
        {formElementsTemplate}
        <div>
          {!auth.loading ? (
            <Button
              onClick={() => {
                handleSignup();
              }}
              color="primary"
            >
              SIGN UP
            </Button>
          ) : (
            <CircularProgress />
          )}
        </div>
      </div>
    </div>
  );
});

export default register;
