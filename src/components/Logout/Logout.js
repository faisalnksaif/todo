import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/action/auth";

const logout = React.memo(props => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.setLogout());
  }, []);
  return <div></div>;
});

export default logout;
