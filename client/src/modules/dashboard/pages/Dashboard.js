import React from "react";
import { useRouteMatch } from "react-router";
import { Switch } from "react-router-dom";
import PrivateRoute from "../../shared/components/PrivateRoute";
import NavBar from "../components/NavBar";
import Upload from "./Upload";
import Notification from "./Notification";
import Profile from "./Profile";
import Feed from "./Feed";

const Dashboard = () => {
  let { url } = useRouteMatch();
  return (
    <div>
      <NavBar />
      <Switch>
        <PrivateRoute exact path={`${url}`} component={Feed} />
        <PrivateRoute path={`${url}/upload`} component={Upload} />
        <PrivateRoute path={`${url}/notifications`} component={Notification} />
        <PrivateRoute path={`${url}/profile`} component={Profile} />
      </Switch>
    </div>
  );
};
export default Dashboard;
