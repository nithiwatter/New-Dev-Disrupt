import React from "react";
import { Switch } from "react-router-dom";

import RouteWithLayout from "./layouts/RouteController";
import MainLayout from "./layouts/MainLayout";
import MinimalLayout from "./layouts/MinimalLayout";
import LoginPage from "./views/LoginPage";
import DashboardPage from "./views/DashboardPage";

export default function Routes() {
  return (
    <Switch>
      <RouteWithLayout
        component={DashboardPage}
        exact
        layout={MainLayout}
        path="/"
      />
      <RouteWithLayout
        component={LoginPage}
        exact
        layout={MinimalLayout}
        path="/login"
      />
    </Switch>
  );
}
