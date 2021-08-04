import React from "react";
import { authenticationService } from "../AuthService";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const ConfirmUser = () => {
  let { id, token } = useParams();
  const { isLoading } = useQuery(
    "activateUser",
    authenticationService.activateUser({ id, token })
  );

  if (isLoading) {
    return <div>Activating your account</div>;
  }

  return (
    <div>
      <h1>User has been activated</h1>
    </div>
  );
};

export default ConfirmUser;
