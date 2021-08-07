import React from "react";
import { authenticationService } from "../AuthService";

import { useMutation } from "react-query";

import { Redirect } from "react-router-dom";
import { useAuthentication, useSocket } from "../../shared/context";
import { Form, Input, Button } from "antd";

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
    return <Redirect to="/" />;
  }

  const onFinish = (values) => {
    mutation.mutate(values);
  };

  return (
    <div>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
