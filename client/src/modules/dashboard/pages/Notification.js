import React from "react";
import { useQuery } from "react-query";
import { dashboardService } from "../DashboardService";
import { useRouteMatch } from "react-router-dom";

const Notification = (props) => {
    const { isLoading, data } = useQuery("getNotification", dashboardService.getNotification);
  
    let { url } = useRouteMatch();
  
    const goToNotificationPage = (id) => {
      props.history.push(`${url}artwork/${id}`);
    };
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (data) {
      return (
        <ul>
          {data.results.map((notification) => (
            <li>{notification.id}</li>
          ))}
        </ul>
      );
    }
  
    return <div>Loading Notification...</div>;
  };


export default Notification