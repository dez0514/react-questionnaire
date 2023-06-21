import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Layout } from 'antd';
import styled from 'styled-components'
import { manageRoutes } from '@/router/router'
import { PlusOutlined } from '@ant-design/icons'
import { createQuestion } from '@/api/question'
const { Sider, Content } = Layout
const BtnBox = styled.div`
  box-sizing: border-box;
  padding: 0 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  width: 120px;
  height: 36px;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  .icon {
    margin-left: 8px;
    margin-right: 5px;
  }
`
const MenuBox = styled.div`
  margin-top: 60px;
  .menu-item {
    margin-bottom: 5px;
  }
  .active {
    background-color: #fff;
    border: 1px solid #eee;
  }
`

function ManageLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  // console.log('location===', location)
  const handleCreate = () => {
    createQuestion().then((res: any) => {
      if(res.code === 0) {
        navigate(`/question/edit/${res.data}`)
      }
    })
  }
  return (
    <Layout hasSider={true}>
      <Sider width={170} style={{ background: 'transparent', height: 'calc(100vh - 64px - 64px)' }}>
        <BtnBox style={{ marginTop: '30px', backgroundColor: '#1890ff', color: '#fff' }} onClick={handleCreate}>
          <div className="icon"><PlusOutlined /></div>
          <div>新建问卷</div>
        </BtnBox>
        <MenuBox>
          {
            manageRoutes.map((item, index) => {
              return (
                <BtnBox
                  key={index}
                  className={ location.pathname === item.fullPath ? 'menu-item active': 'menu-item'}
                  onClick={() => navigate(item.fullPath || '/manage')}
                >
                  <div className="icon">{ item.icon }</div>
                  <div>{ item.label }</div>
                </BtnBox>
              )
            })
          }
        </MenuBox>
      </Sider>
      <Content style={{ height: 'calc(100vh - 64px - 64px)', overflow: 'hidden', overflowY: 'auto'}}>
        <Outlet />
      </Content>
    </Layout>
  )
}

export default ManageLayout