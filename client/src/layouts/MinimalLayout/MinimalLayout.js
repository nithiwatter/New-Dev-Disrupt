import React from "react";
import { Redirect } from "react-router-dom";

import AuthContext from "../../auth/context";

export default function MinimalLayout(props) {
  const { user } = React.useContext(AuthContext);
  const { children } = props;

  if (user) {
    // assuming that no user page always use this minimal layout
    return <Redirect to="/" />;
  }

  return <div>{children}</div>;
}
