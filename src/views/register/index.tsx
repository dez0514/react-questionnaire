import { Button, Form, Input } from 'antd';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`
function Register() {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <FlexBox>
      <h2 style={{ marginBottom: '40px' }}>用户注册</h2>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 16 }} style={{ marginBottom: 0 }}>
          <Button block type="primary" htmlType="submit">注册</Button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 16 }} style={{ textAlign: 'center' }}>
          <Link to="/login">已有账号，去登录</Link>
        </Form.Item>
      </Form>
    </FlexBox>
  )
}

export default Register