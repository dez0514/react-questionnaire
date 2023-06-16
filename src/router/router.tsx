import { Navigate } from "react-router-dom"
import { RouterType } from '@/types'
import { UnorderedListOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import Home from '@/views/home'
import Login from '@/views/login'
import Register from '@/views/register'
import NotFound from '@/views/error/404'
import MainLayout from '@/layout/MainLayout'
import ManageLayout from '@/layout/ManageLayout'
import AllList from '@/views/manage/list'
import StarList from '@/views/manage/star'
import DeleteList from '@/views/manage/trash'
import QuestionLayout from '@/layout/QuestionLayout'
import Edit from '@/views/question/edit'
import Stat from '@/views/question/stat'

export const manageRoutes: RouterType[] = [
  {
    path: 'list',
    fullPath: '/manage/list',
    label: '我的问卷',
    icon: <UnorderedListOutlined />,
    element: <AllList />
  },
  {
    path: 'star',
    fullPath: '/manage/star',
    label: '标星问卷',
    icon: <StarOutlined />,
    element: <StarList />
  },
  {
    path: 'trash',
    fullPath: '/manage/trash',
    label: '回收站',
    icon: <DeleteOutlined />,
    element: <DeleteList />
  }
]
export const mainRoutesChildren: RouterType[] = [
  {
    path: '/',
    label: '首页',
    element: <Home />
  },
  {
    path: 'login',
    label: '登录',
    element: <Login />
  },
  {
    path: 'register',
    label: '注册',
    element: <Register />
  },
  {
    path: 'manage',
    label: '问卷管理',
    element: <ManageLayout />,
    children: [
      { path: '', element: <Navigate to="/manage/list" /> },
      ...manageRoutes
    ]
  }
]

export const mainRoutes: RouterType[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [...mainRoutesChildren]
  },
  {
    path: '/question',
    label: '问卷详情',
    element: <QuestionLayout />,
    children: [
      { path: '', element: <Navigate to="/404" /> },
      {
        path: 'edit/:id',
        label: '问卷编辑',
        element: <Edit />,
      },
      {
        path: 'detail/:id',
        label: '问卷统计',
        element: <Stat />,
      },
    ]
  },
  {
    path: '/404',
    label: '404',
    element: <NotFound />
  },
  {
    path: "*",
    element: <Navigate to='/404' />
  }
]


