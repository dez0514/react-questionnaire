import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import useGetUserInfo from './useGetUserInfo'
import { getUserInfo } from '@/api/user'
import { updateUserinfo } from '@/actions';

function useLoadUserData() {
  const dispatch = useDispatch()
  const [waitingUserData, setWaitingUserData] = useState(true)
  const token = sessionStorage.getItem('token')

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfo, {
    manual: true,
    onSuccess(result) {
      console.log('result====', result)
      const userinfo = JSON.stringify(result.data)
      sessionStorage.setItem('userinfo', userinfo)
      dispatch(updateUserinfo({...result.data})) // 存储到 redux store
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // 判断当前 redux store 是否已经存在用户信息
  const { username } = useGetUserInfo() // redux store
  useEffect(() => {
    if (!token || username) {
      setWaitingUserData(false) // 如果 redux store 已经存在用户信息，就不用重新加载了
      return
    }
    run() // 如果 redux store 中没有用户信息，则进行加载
  }, [username])

  return { waitingUserData }
}

export default useLoadUserData
