
import { get, post } from '@/utils/fetch'

export const loginPost = (params: any = {}, config: any = {}) => {
  return post('/api/user/login', params, config)
}

export const getUserInfo = (params: any = {}, config: any = {}) => {
  return get('/api/user/info', params, config)
}