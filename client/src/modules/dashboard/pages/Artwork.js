import React, { useState } from "react";
import { useQuery } from "react-query";
import { dashboardService } from "../DashboardService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const Artwork = () => {
  const { id } = useParams();
  const { isLoading, data } = useQuery(
    ["artwork", id], () =>
    dashboardService.artwork(id)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return (
      <div>
        <li key={data.id}>
          <FontAwesomeIcon icon={faCoffee} />
          {data.id}{" "}
          <img src={data.image} alt={data.name} width="150px" height="150px" />
        </li>
      </div>
    );
  }
};

export default Artwork;
