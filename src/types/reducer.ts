import { ComponentPropsType } from '@/components/QuestionComponents'
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

export type ComponentInfoType = {
  fe_id: string // 前端生成的 id ，服务端 Mongodb 不认这种格式，所以自定义一个 fe_id
  type: string
  title: string
  isHidden?: boolean
  isLocked?: boolean
  props: ComponentPropsType
}

export type MoveCompsType = { 
  oldIndex: number
  newIndex: number
}

export type componentState = {
  selectId?: string
  componentList?: ComponentInfoType[]
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

export type UpdatePropsType = {
  fe_id: string
  newProps: ComponentPropsType
}
// action 需要合并所有的 payload 的 type
export type componentAction = {
  type: string
  payload: componentState & ComponentInfoType & MoveCompsType & UpdatePropsType
}
