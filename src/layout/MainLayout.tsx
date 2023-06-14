import { Outlet } from "react-router-dom"
import { Layout } from 'antd';
import { FormOutlined } from '@ant-design/icons'
import styled from 'styled-components'
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
  return (
    <Layout>
      <Header style={{ height: '64px' }}>
        <FlexBox>
          <div className="left">
            <FormOutlined className="t-icon" />
            <div className="title">DDM问卷</div>
          </div>
          <div className="right"></div>
        </FlexBox>
      </Header>
      <Content style={{ height: 'calc(100vh - 64px - 64px)' }}>
        <Outlet />
      </Content>
      <Footer style={{ padding: '0 50px', boxSizing: 'border-box', height: '64px', borderTop: '2px solid #33333317' }}>
        <div style={{textAlign: 'center', lineHeight: '62px'}}>DDM问卷@2023 - present. Created by hanshanshaonian</div>
      </Footer>
    </Layout>
  )
}

export default MainLayout