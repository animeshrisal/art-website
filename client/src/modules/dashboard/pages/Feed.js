import React from "react";
import { useQuery } from "react-query";
import { dashboardService } from "../DashboardService";
import { useRouteMatch } from "react-router-dom";
import ArtworkCard from "../components/ArtworkCard";
import "../styling/Feed.scss";

const Feed = (props) => {
  const { isLoading, data } = useQuery("getFeed", dashboardService.getFeed);

  let { url } = useRouteMatch();

  const goToDetailPage = (id) => {
    props.history.push(`${url}/artwork/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div class="feed-container">
        {data.results.map((artwork) => (
          <ArtworkCard class="grid-item"
            goToDetailPage={goToDetailPage}
            key={artwork.id}
            {...artwork}
          />
        ))}
      </div>
    );
  }

  return <div>Feed...</div>;
};

export default Feed;
