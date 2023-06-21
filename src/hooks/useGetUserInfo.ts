import { useSelector } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer'

function useGetUserInfo() {
  const { userinfo = {} } = useSelector((store: GlobalConfigState) => store.userReducer)
  return { ...userinfo }
}

export default useGetUserInfo