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

export type GlobalConfigState = {
  globalConfig: configState
  userReducer: userState
}

export type configAction = {
  type: string
  payload: configState
}

export type userAction = {
  type: string
  payload: userState
}

export type ConfigReducerType = React.Reducer<configState, configAction>