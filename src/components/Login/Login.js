import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/action/auth";
import TextField from "@material-ui/core/TextField";
import { Button, CircularProgress } from "@material-ui/core";
import * as snackbarActions from "../../store/action/snackbar";
import "./Login.css";

export const login = React.memo(props => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(auth);

    if (!!auth.idToken) {
      dispatch(snackbarActions.setSnackBarLabel("Login Success"));
      props.history.push('/')
    }
    if (!!auth.error) {
      dispatch(snackbarActions.setSnackBarLabel(auth.error));
    }
  }, [auth]);

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
        <div>
          {!auth.loading ? (
            <Button
              onClick={() => {
                dispatch(actions.signIn(email, password));
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
