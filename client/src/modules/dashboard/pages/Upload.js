import React, { useState } from "react";
import { useMutation } from "react-query";
import { dashboardService } from "../DashboardService";
import { Form, Input, Button, Upload, notification, Select } from "antd";

const ImageUpload = () => {
  const children = [];
  const mutation = useMutation(
    (artwork) => dashboardService.imageUpload(artwork),
    {
      onSuccess: (mutation) => {
        openNotification()
      },
    }
  );

  const openNotification = () => {
    notification.open({
      message: 'Success',
      description:
        'Image has successfully been uploaded!',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const [fileList, setFileList] = useState([]);

  const props = {
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
  };

  const onFinish = (values) => {
    mutation.mutate({ ...values, image: fileList[0] });
  };

  return (
    <div className="container">
      <h1>Upload</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="name"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="description" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="Image" name="image">
          <Upload {...props} fileList={fileList}>
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Select mode="tags" style={{ width: '100%' }} placeholder="Tags Mode">
            {children}
          </Select>
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

export default ImageUpload;
