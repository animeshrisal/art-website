import React from "react";
import { Formik, Field, Form } from "formik";
import { authenticationService } from "../AuthService";

import { useMutation } from "react-query";

import { Redirect } from "react-router-dom";

const Register = () => {

  const mutation = useMutation((user) => authenticationService.register(user));

  if (mutation.isSuccess) {
    return <div>
      Thank you for signing up! You should be getting an email! Please click the link in the email to activate it!
    </div>;
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          re_password: ""
        }}
        onSubmit={async (values) => {
          mutation.mutate(values);
        }}
      >
        <Form>
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" placeholder="Jane" />

          <label htmlFor="email">Email</label>
          <Field id="email" name="email" placeholder="jane@foster.com" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" />

          <label htmlFor="re_password">Password Confirmation</label>
          <Field id="re_password" name="re_password" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
