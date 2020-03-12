import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/action/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./Login.css";

export const login = React.memo(props => {
  const authentication = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <Button
            onClick={() => {
              dispatch(actions.signIn(email, password));
            }}
            color="primary"
          >
            SIGN IN
          </Button>
        </div>
      </div>
    </div>
  );
});

export default login;
