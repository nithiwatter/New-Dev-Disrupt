import React from "react";
import { Route } from "react-router-dom";

export default function RouteWithLayout(props) {
  const { layout: Layout, component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
}
