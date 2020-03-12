import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../../components/Header/Header";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
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

const routes = LINKS_WITHOUT_AUTH.map((route, index) => {
  return <Route key={index} path={route.path} component={route.component} />;
});

const layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container className="container" maxWidth="lg">
        <Switch>{routes}</Switch>
      </Container>
    </ThemeProvider>
  );
};

export default layout;
