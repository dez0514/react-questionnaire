import { ComponentConfType } from '@/components/QuestionComponents'
interface UserType {
  username?: string
  avatar?: string
}
export type configState = {
  showGlobalLoading?: boolean
}
export type userState = {
  userinfo?: UserType
}
export type componentState = {
  selectId?: string
  componentList?: ComponentConfType[]
}

export type GlobalConfigState = {
  globalConfig: configState
  userReducer: userState
  componentReducer: componentState
}

export type configAction = {
  type: string
  payload: configState
}

export type userAction = {
  type: string
  payload: userState
}

export type componentAction = {
  type: string
  payload: componentState
}
