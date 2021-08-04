import React from "react";
import { Formik, Field, Form } from "formik";
import { authenticationService } from "../AuthService";

import { useMutation } from "react-query";

import { Redirect } from "react-router-dom";
import { useAuthentication, useSocket } from "../../shared/context";

const Login = () => {
  const { dispatch } = useAuthentication();
  const { connect } = useSocket();
  const mutation = useMutation((user) => authenticationService.login(user), {
    onSuccess: (mutation) => {
      dispatch({
        type: "LOGIN",
        payload: mutation,
      });

      connect(mutation.access)
    },
  });

  if (mutation.isSuccess) {
    return <Redirect to="/dashboard" /> 
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          mutation.mutate(values);
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" placeholder="Jane" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
