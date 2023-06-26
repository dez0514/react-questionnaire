import {
  UPDATE_CONFIG,
  UPDATE_USERINFO,
  RESET_USERINFO,
  INIT_COMPONENT,
  ADD_COMPONENT,
  SET_SELECT_ID,
  MOVE_COMPONENT,
  DELETE_COMPONENT,
  CHANGE_COMPONENT_PROPS,
  CHANGE_COMPONENT_TITLE,
  CHANGE_COMPONENT_HIDDEN,
  CHANGE_COMPONENT_LOCK,
  COPY_SELECT_COMPONENT,
  PASTE_COPIED_COMPONENT
} from '@/actions/actionTypes'
import { componentState, configState, userState, ComponentInfoType, MoveCompsType, UpdatePropsType, UpdateCompsAttrType } from '@/types/reducer'

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

export const initComponent = (payload: componentState) => {
  return {
    type: INIT_COMPONENT,
    payload
  }
}

export const addComponent = (payload: ComponentInfoType) => {
  return {
    type: ADD_COMPONENT,
    payload
  }
}

export const moveComponent = (payload: MoveCompsType) => {
  return {
    type: MOVE_COMPONENT,
    payload
  }
}

export const deleteComponent = () => {
  return {
    type: DELETE_COMPONENT
  }
}

export const setSelectId = (payload: string) => {
  return {
    type: SET_SELECT_ID,
    payload
  }
}

export const copySelectedComponent = () => {
  return {
    type: COPY_SELECT_COMPONENT
  }
}

export const pasteCopiedComponent = () => {
  return {
    type: PASTE_COPIED_COMPONENT
  }
}

export const changeComponentProps = (payload: UpdatePropsType) => {
  return {
    type: CHANGE_COMPONENT_PROPS,
    payload
  }
}

export const changeComponentTitle = (payload: UpdateCompsAttrType) => {
  return {
    type: CHANGE_COMPONENT_TITLE,
    payload
  }
}
export const changeComponentLock = (payload: UpdateCompsAttrType) => {
  return {
    type: CHANGE_COMPONENT_LOCK,
    payload
  }
}
export const changeComponentHidden = (payload: UpdateCompsAttrType) => {
  return {
    type: CHANGE_COMPONENT_HIDDEN,
    payload
  }
}
