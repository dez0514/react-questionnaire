import { UPDATE_CONFIG, UPDATE_USERINFO, RESET_USERINFO } from '@/actions/actionTypes'
import { configState, userState } from '@/types/reducer'
// Action是一个Object 或者 函数, 用于描述发生的动作
export const updateConfig = (payload: configState) => {
  return {
    type: UPDATE_CONFIG,
    payload
  }
}

export const updateUserinfo = (payload: userState) => {
  console.log('pay====', payload)
  return {
    type: UPDATE_USERINFO,
    payload
  }
}

export const resetUserinfo = () => {
  return {
    type: RESET_USERINFO
  }
}