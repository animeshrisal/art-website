import React from "react";
import { useQuery } from "react-query";
import { dashboardService } from "../DashboardService";
import { useParams } from "react-router-dom";
import { Image } from 'antd';

const Artwork = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery(["artwork", id], () =>
    dashboardService.artwork(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div>
        <li key={data.id}>
          <Image width={200} src={data.image} />
        </li>
      </div>
    );
  }
};

export default Artwork;
