import React from "react";
import { authenticationService } from "../AuthService";

import { useMutation } from "react-query";

import { Redirect } from "react-router-dom";
import { useAuthentication, useSocket } from "../../shared/context";
import { Form, Input, Button } from "antd";

import "../styling/AuthForm.scss";

const Login = () => {
  const { dispatch } = useAuthentication();
  const { connect } = useSocket();
  const mutation = useMutation((user) => authenticationService.login(user), {
    onSuccess: (mutation) => {
      dispatch({
        type: "LOGIN",
        payload: mutation,
      });

      connect(mutation.access);
    },
  });

  if (mutation.isSuccess) {
    return <Redirect to="/dashboard/" />;
  }

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <div className= "container">
      <h1 className= "header">Login</h1>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
