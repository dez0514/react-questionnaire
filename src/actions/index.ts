import { UPDATE_CONFIG } from '@/actions/actionTypes'
import { configState } from '@/types/reducer'
// Action是一个Object 或者 函数, 用于描述发生的动作
export const updateConfig = (payload: configState) => {
  return {
    type: UPDATE_CONFIG,
    payload
  }
}
