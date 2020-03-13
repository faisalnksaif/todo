import React, { useEffect, useState,useCallback } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { LINKS_WITHOUT_AUTH, LINKS_WITH_AUTH } from "../../../const/routes";

const naviagations = React.memo(props => {
  const authState = useSelector(state => state.auth);
  const [links, setLinks] = useState([]);
  const handleNavigation = link => {
    props.history.push(link.path);
  };

  useEffect(() => {
    const userLinks = authState.idToken ? LINKS_WITH_AUTH : LINKS_WITHOUT_AUTH;
    setLinks(
      userLinks.map((link, index) => {
        return (
          <Button
            key={index}
            onClick={() => {
              handleNavigation(link);
            }}
            color="inherit"
          >
            {link.name}
          </Button>
        );
      })
    );
  }, [authState]);

  return <React.Fragment>{links}</React.Fragment>;
});

export default withRouter(naviagations);
