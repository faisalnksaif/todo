import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { LINKS_WITHOUT_AUTH, LINKS_WITH_AUTH } from "../../../const/routes";

const naviagations = props => {
  const handleNavigation = link => {
    props.history.push(link.path);
  };

  const linkTemplate = LINKS_WITHOUT_AUTH.map((link, index) => {
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
  });

  return <React.Fragment>{linkTemplate}</React.Fragment>;
};

export default withRouter(naviagations);
