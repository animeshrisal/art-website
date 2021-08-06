import React, { useState } from "react";
import { useQuery } from "react-query";
import { dashboardService } from "../DashboardService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { useRouteMatch } from "react-router-dom";

const Feed = (props) => {
  
  const { isLoading, data } = useQuery("getFeed", dashboardService.getFeed);
  
  let { url } = useRouteMatch();

  const goToDetailPage = (id) => {
    console.log(url)
    props.history.push(`${url}/artwork/${id}`);
  }

  const renderImage = (image) => {
    return (
      <li key={image.id} onClick={()=>goToDetailPage(image.id)}>
          <FontAwesomeIcon icon={faCoffee} />
        {image.id} <img src={image.image} alt={image.name} width="150px" height="150px" />
      </li>
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <ul>{data.results.map((x) => renderImage(x))}</ul>;
  }

  return <div>Feed...</div>;
};

export default Feed;
