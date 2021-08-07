import React from "react";
import { useQuery } from "react-query";
import { dashboardService } from "../DashboardService";
import { useRouteMatch } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";

const Feed = (props) => {
  const { isLoading, data } = useQuery("getFeed", dashboardService.getFeed);

  let { url } = useRouteMatch();

  const goToDetailPage = (id) => {
    props.history.push(`${url}artwork/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <ul>
        {data.results.map((artwork) => (
          <ArtworkCard
            goToDetailPage={goToDetailPage}
            key={artwork.id}
            {...artwork}
          />
        ))}
      </ul>
    );
  }

  return <div>Feed...</div>;
};

export default Feed;
