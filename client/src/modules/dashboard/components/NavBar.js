import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthentication, useSocket } from "../../shared/context";
import { Menu } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Badge } from 'antd';
import { dashboardService } from "../DashboardService";
import { useQuery } from "react-query";

const NavBar = (props) => {
  const { state, dispatch } = useAuthentication();
  const [current, setCurrent] = useState('dashboard');
  const { data } = useQuery(['notificationBadge'], dashboardService.getNotificationBadge)
  console.log(data)
  const {disconnect} = useSocket();
  const url = "/dashboard"

  if (!state.isAuthenticated) {
    return <div />;
  }

  const handleMenu = e => {
    setCurrent(e.key)
  }

  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
    disconnect();
  };

  return (
    <Menu theme="dark" mode="horizontal" onClick={handleMenu} selectedKeys={[current]}>
      <Menu.Item key="dashboard">
        <NavLink
          activeClassName="selected-nav-item"
          className="nav-item"
          to={`${url}`}
        >
          Dashboard
        </NavLink>
      </Menu.Item>
      <Menu.Item key="upload">
        <NavLink
          activeClassName="selected-nav-item"
          className="nav-item"
          to={`${url}/upload`}
        >
          Upload
        </NavLink>
      </Menu.Item>
      <Menu.Item key="notifications">
        <NavLink
          activeClassName="selected-nav-item"
          className="nav-item"
          to={`${url}/notifications`}
        >
          Notifications
        </NavLink>
      </Menu.Item>
      <Menu.Item key="profile">
        <NavLink
          activeClassName="selected-nav-item"
          className="nav-item"
          to={`${url}/profile`}
        >
          Profile
        </NavLink>
      </Menu.Item>
      <Menu.Item key="logout">
        <NavLink
          activeClassName="selected-nav-item"
          className="nav-item"
          to="/login"
          onClick={logoutUser}
        >
          Logout
        </NavLink>
      </Menu.Item>

      <Menu.Item key='notification'>
        <Badge count={data}>
        <FontAwesomeIcon icon={faBell} size={'2x'}/>
        </Badge>
      </Menu.Item>
    </Menu>
  );
};

export default NavBar;
