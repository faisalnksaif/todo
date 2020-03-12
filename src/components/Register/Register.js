import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/action/auth";
import {
  TextField,
  Snackbar,
  Button,
  CircularProgress
} from "@material-ui/core";
import "./Register.css";

export const register = React.memo(props => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackLabel, setSnackLabel] = useState();

  useEffect(() => {
    console.log(auth);
    if (auth.error) {
      setSnackLabel(auth.error);
    } else if (auth.uid && auth.email) {
      setSnackLabel("Registration Success");
      props.history.push("/");
    }
  }, [auth]);

  const handleSignup = () => {
    if (email === "") {
      setSnackLabel("Please enter the email address");
    } else if (password === "") {
      setSnackLabel("Please enter the password");
    } else if (confirmPassword === "") {
      setSnackLabel("Please confirm your password");
    } else if (password !== confirmPassword) {
      setSnackLabel("Please confirm your password again");
      setConfirmPassword("");
    } else {
      dispatch(actions.signUp(email, password));
    }
  };

  const handleClose = () => {
    setSnackLabel("");
    dispatch(actions.setClearStatus());
  };

  return (
    <div className="Login">
      <div className="center">
        <TextField
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
          label="Email"
        />
        <TextField
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
          type="password"
          label="Password"
        />
        <TextField
          value={confirmPassword}
          onChange={event => {
            setConfirmPassword(event.target.value);
          }}
          type="password"
          label="Confirm Password"
        />
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

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={!!snackLabel}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackLabel}
        />
      </div>
    </div>
  );
});

export default register;
