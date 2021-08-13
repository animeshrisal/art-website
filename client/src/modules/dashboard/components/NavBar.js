import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../shared/context";
import { Menu } from "antd";

const NavBar = (props) => {
  const { state, dispatch } = useAuthentication();
  const [current, setCurrent] = useState('dashboard');
  const url = "/dashboard"

  if (!state.isAuthenticated) {
    return <div />;
  }

  const handleMenu = e => {
    setCurrent(e.key)
  }

  const logoutUser = () => {
    dispatch({ type: "LOGOUT" });
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
    </Menu>
  );
};

export default NavBar;
