import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useGetUserInfo from './useGetUserInfo'
import { loginOrRegisterPathName, noNeedLoginPathNameArr } from '@/router/router'

function useAuthRedirct(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (waitingUserData) return
    // 已经登录了
    if (username) {
      if (loginOrRegisterPathName.includes(pathname)) {
        navigate('/manage')
      }
      return
    }
    // 未登录
    if (!noNeedLoginPathNameArr.includes(pathname)) {
      navigate('/login')
    }
  }, [waitingUserData, username, pathname])
}

export default useAuthRedirct
