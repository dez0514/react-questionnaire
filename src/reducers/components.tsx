import { componentState, componentAction, ComponentInfoType } from '@/types/reducer'
import { INIT_COMPONENT, ADD_COMPONENT, SET_SELECT_ID, MOVE_COMPONENT, CHANGE_COMPONENT_PROPS, DELETE_COMPONENT, PASTE_COPIED_COMPONENT, COPY_SELECT_COMPONENT, CHANGE_COMPONENT_TITLE, CHANGE_COMPONENT_LOCK, CHANGE_COMPONENT_HIDDEN } from '@/actions/actionTypes'
import { produce } from 'immer'
import { arrayMove } from '@dnd-kit/sortable'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'

export const initialComponentState: componentState = {
  selectId: '',
  componentList: [],
  copiedComponent: null
};

export const componentReducer = (
  state: componentState = initialComponentState, 
  { type, payload } : componentAction
) => {
  switch (type) {
    case INIT_COMPONENT:
      const initSate: componentState  = payload
      return { ...state, ...initSate }
    case ADD_COMPONENT:
      const nextState = produce(state, (draftState: componentState) => {
        insertNewComponent(draftState, payload)
      })
      return { ...state, ...nextState }
    case MOVE_COMPONENT:
      // 移动组件位置
      const moveState = produce(state, (draftState: componentState) => {
        const { componentList = [] } = draftState
        const { oldIndex, newIndex } = payload
        draftState.componentList = arrayMove(componentList, oldIndex, newIndex)
      })
      return { ...state, ...moveState }
    case DELETE_COMPONENT:
      const delState = produce(state, (draftState: componentState) => {
        const { componentList = [], selectId } = draftState
        draftState.componentList = componentList.filter(item => item.fe_id !== selectId)
        draftState.selectId = ''
      })
      return { ...state, ...delState }
    case COPY_SELECT_COMPONENT:
      const copyState = produce(state, (draft: componentState) => {
        const { componentList = [], selectId } = draft
        const selectedComponent = componentList.find(c => c.fe_id === selectId)
        if (selectedComponent == null) return
        draft.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
      })
      return { ...state, ...copyState }
    case PASTE_COPIED_COMPONENT:
      const pasteState = produce(state, (draft: componentState) => {
        const { copiedComponent } = draft
        if (copiedComponent == null) return
        // 要把 fe_id 给修改了，重要！！
        copiedComponent.fe_id = nanoid()
        // 插入 copiedComponent
        insertNewComponent(draft, copiedComponent)
        debugger
      })
      return { ...state, ...pasteState }
    case SET_SELECT_ID:
      return { ...state, selectId: payload }
    case CHANGE_COMPONENT_PROPS:
      const ntState = produce(state, (draftState: componentState) => {
        const { fe_id, newProps } = payload
        const { componentList = [] } = draftState
        const curComp = componentList.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          }
        }
      })
      return {...state , ...ntState }
    case CHANGE_COMPONENT_TITLE:
      const changetitleState = produce(state, (draftState: componentState) => {
        const { fe_id, title } = payload
        const curComp = draftState.componentList?.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.title = title
        }
      })
      return {...state , ...changetitleState }
    case CHANGE_COMPONENT_HIDDEN:
      const changehdState = produce(state, (draftState: componentState) => {
        const { fe_id } = payload
        const curComp = draftState.componentList?.find(c => c.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = !curComp.isHidden
        }
      })
      return {...state , ...changehdState }
    case CHANGE_COMPONENT_LOCK:
        const changeLkState = produce(state, (draftState: componentState) => {
          const { fe_id } = payload
          const curComp = draftState.componentList?.find(c => c.fe_id === fe_id)
          if (curComp) {
            curComp.isLocked = !curComp.isLocked
          }
        })
        return {...state , ...changeLkState }
    default:
      return state;
  }
}

/**
 * 插入新组件
 * @param draft state draft
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: componentState, newComponent: ComponentInfoType) {
  const { selectId, componentList = [] } = draft
  const index = componentList.findIndex(c => c.fe_id === selectId)
  if (index < 0) {
    // 未选中任何组件
    draft.componentList = [...componentList, newComponent]
  } else {
    // 选中了组件，插入到 index 后面
    draft.componentList?.splice(index + 1, 0, newComponent)
  }
  draft.selectId = newComponent.fe_id
}