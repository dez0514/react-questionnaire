export type configState = {
  showGlobalLoading?: boolean 
}

export type GlobalConfigState = {
  globalConfig: configState
}

export type configAction = {
  type: string,
  payload: configState
}

export type ConfigReducerType = React.Reducer<configState, configAction>