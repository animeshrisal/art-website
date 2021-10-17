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
import { notification } from 'antd';
import { useSocket } from "../shared/context";

const Dashboard = () => {
  let { url } = useRouteMatch();
  const { notification: notificationBoolean, closeNotification } = useSocket();

    const args = {
      message: 'Notification Title',
      description:
        'I will never close automatically. This is a purposely very very long description that has many many characters and words.',
      duration: 0,
      onClose: () => {
        closeNotification()
      }
    };

  if(notificationBoolean) {
    notification.open(args);
  }

  return (
    <div>
      <Layout className="layout">
        <Header>
          <NavBar />
        </Header>
      </Layout>
      <Content style={{ padding: '0 50px' }}>
        <Switch>
          <PrivateRoute exact path={`${url}`} component={Feed} />
          <PrivateRoute path={`${url}/artwork/:id`} component={Artwork} />
          <PrivateRoute path={`${url}/upload`} component={Upload} />
          <PrivateRoute path={`${url}/notifications`} component={Notification} />
          <PrivateRoute path={`${url}/profile`} component={Profile} />
        </Switch>
      </Content>

    </div>
  );
};
export default Dashboard;
