import React, { useState } from "react";
import { useQuery } from "react-query";
import { dashboardService } from "../DashboardService";

const Feed = () => {
  const { isLoading, data } = useQuery("getFeed", dashboardService.getFeed);

  const renderImage = (image) => {
    return (
      <li key={image.id}>
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
