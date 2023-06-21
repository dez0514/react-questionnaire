import { useMemo } from 'react'
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { Layout, Avatar, Dropdown, Space, Button } from 'antd';
import { FormOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd';
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux"
import { GlobalConfigState } from '@/types/reducer'
import { resetUserinfo } from "@/actions";
import useLoadUserData from '@/hooks/useLoadUserData'
import useAuthRedirct from '@/hooks/useAuthRedirct'
const { Header, Footer, Content } = Layout
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  height: 100%;
  .left {
    display: flex;
    align-items: center;
    font-size: 22px;
    .title {
      font-weight: 600;
      margin-left: 10px;
      color: #fff;
    }
  }
`

function MainLayout() {
  const { waitingUserData } = useLoadUserData()
  useAuthRedirct(waitingUserData)
  const navigate = useNavigate()
  const location = useLocation()
  console.log('location==', location)
  const dispatch = useDispatch()
  const { userinfo } = useSelector((store: GlobalConfigState) => store.userReducer)
  const notShowRight = useMemo(() => {
    const whitePathArr = ['/', '/login', '/register']
    return whitePathArr.includes(location.pathname)
  }, [location])
  // console.log('notShowRight==', notShowRight)
  const logout = () => {
    sessionStorage.clear()
    dispatch(resetUserinfo())
  }
  const toLogin = () => {
    navigate('/login')
  }
  const items: MenuProps['items'] = [
    {
      label: <div onClick={logout}>退出登录</div>,
      key: '1',
    }
  ];
  return (
    <Layout>
      <Header style={{ height: '64px' }}>
        <FlexBox>
          <div className="left">
            <FormOutlined className="t-icon" />
            <div className="title">DDM问卷</div>
          </div>
          {!notShowRight && <div className="right">
            {userinfo?.username && <div className="userinfo">
              <Dropdown menu={{ items }} trigger={['click']}>
                <div style={{ cursor: 'pointer' }}>
                  <Space>
                    {userinfo && userinfo.avatar && <Avatar src={userinfo.avatar} />}
                    {userinfo && userinfo.username && <span>{userinfo.username}</span>}
                  </Space>
                </div>
              </Dropdown>
            </div>}
            {
              !userinfo?.username && <Button type="link" onClick={toLogin}>登录</Button>
            }
          </div>}
        </FlexBox>
      </Header>
      <Content style={{ height: 'calc(100vh - 64px - 64px)' }}>
        {!waitingUserData && <Outlet />}
      </Content>
      <Footer style={{ padding: '0 50px', boxSizing: 'border-box', height: '64px', borderTop: '2px solid #33333317' }}>
        <div style={{ textAlign: 'center', lineHeight: '62px' }}>DDM问卷@2023 - present. Created by hanshanshaonian</div>
      </Footer>
    </Layout>
  )
}

export default MainLayout