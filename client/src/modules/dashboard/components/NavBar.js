import React from "react";
import { NavLink } from 'react-router-dom';
import { useAuthentication } from "../../shared/context";

const NavBar = (props) => {

    const { state, dispatch } = useAuthentication()
    if (!state.isAuthenticated){
        return (
            <div/>
        )
    }

    const logoutUser = () => {
        dispatch({type: 'LOGOUT'})         
    }

    return (
         <ul className="nav-list">
            <NavLink activeClassName="selected-nav-item" className="nav-item" to="/dashboard"></NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/profile">Account</NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/notification">Notifications</NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/login"  onClick={logoutUser}>Logout</NavLink>
        </ul>
    )   
}


export default NavBar;