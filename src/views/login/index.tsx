import { Button, Checkbox, Form, Input } from 'antd';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { loginPost, getUserInfo } from '@/api/user';
import { updateUserinfo } from '@/actions';
import { useDispatch } from 'react-redux';

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`
function Login() {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = (values: any) => {
    console.log('Success:', values);
    const { username, password } = values
    loginPost({ username, password }).then(res => {
      // console.log('login===', res)
      const token = res.data
      sessionStorage.setItem('token', token)
      getUserInfo().then((result: any) => {
        // console.log('info===', result)
        if(result.code === 0) {
          const userinfo = JSON.stringify(result.data)
          sessionStorage.setItem('userinfo', userinfo)
          dispatch(updateUserinfo({...result.data}))
          // navigate('/manage')
        }
      })
    })
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <FlexBox>
      <h2 style={{ marginBottom: '40px' }}>用户登录</h2>
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 600 }}
        initialValues={{ remember: false }}
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
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 5, span: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Checkbox>记住密码</Checkbox>
            <Link to="/register">注册新用户</Link>
          </div>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
          <Button block type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </FlexBox>
  )
}

export default Login