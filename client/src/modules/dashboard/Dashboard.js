import React from "react";
import { useRouteMatch } from "react-router";
import { Switch } from "react-router-dom";
import PrivateRoute from "../shared/components/PrivateRoute";
import NavBar from "./components/NavBar";
import Upload from "./pages/Upload";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import Artwork from "./pages/Artwork";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import { Breadcrumb } from "antd";

const Dashboard = () => {
  let { url } = useRouteMatch();
  return (
    <div>
      <Layout className="layout">
        <Header>
          <NavBar />
        </Header>
      </Layout>
      <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content">Content</div>
      <Switch>
        <PrivateRoute exact path={`${url}`} component={Feed} />
        <PrivateRoute path={`${url}artwork/:id`} component={Artwork} />
        <PrivateRoute path={`${url}upload`} component={Upload} />
        <PrivateRoute path={`${url}notifications`} component={Notification} />
        <PrivateRoute path={`${url}profile`} component={Profile} />
      </Switch>
    </Content>

    </div>
  );
};
export default Dashboard;
