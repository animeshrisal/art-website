import React from "react";
import { authenticationService } from "../AuthService";
import { useMutation } from "react-query";

const Register = () => {
  const mutation = useMutation((user) => authenticationService.register(user));

  if (mutation.isSuccess) {
    return (
      <div>
        Thank you for signing up! You should be getting an email! Please click
        the link in the email to activate it!
      </div>
    );
  }

  return (
    <div>
      <h1>Sign Up</h1></div>
  );
};

export default Register;
