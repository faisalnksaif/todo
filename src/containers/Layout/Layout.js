import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header/Header";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Container, Snackbar } from "@material-ui/core";
import * as snackbarActions from "../../store/action/snackbar";
import { LINKS_WITHOUT_AUTH, LINKS_WITH_AUTH } from "../../const/routes";
import "./Layout.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#333"
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#f7f7f7"
    }
  }
});

const layout = React.memo(() => {
  const auth = useSelector(state => state.auth);
  const snackbarLabel = useSelector(state => state.snackbar.label);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [routes, setRoutes] = useState([]);
  console.log(snackbarLabel)

  const snackbarCloseHandler = () => {
    dispatch(snackbarActions.setSnackBarLabel(""));
  };

  useEffect(() => {
    setLoggedIn(!!auth.idToken);
    const routeLinks = loggedIn ? LINKS_WITH_AUTH : LINKS_WITHOUT_AUTH;
    setRoutes(
      routeLinks.map((route, index) => {
        return (
          <Route key={index} path={route.path} component={route.component} />
        );
      })
    );
  }, [auth]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container className="container" maxWidth="lg">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              loggedIn ? <Redirect to="/todo" /> : <Redirect to="/login" />
            }
          />
          {routes}
        </Switch>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={!!snackbarLabel}
          autoHideDuration={6000}
          onClose={snackbarCloseHandler}
          message={snackbarLabel}
        />
      </Container>
    </ThemeProvider>
  );
});

export default layout;
