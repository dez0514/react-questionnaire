import { componentState, componentAction, ComponentInfoType } from '@/types/reducer'
import { ADD_COMPONENT, SET_SELECT_ID, MOVE_COMPONENT, CHANGE_COMPONENT_PROPS, DELETE_COMPONENT, CHANGE_COMPONENT_TITLE, CHANGE_COMPONENT_LOCK, CHANGE_COMPONENT_HIDDEN } from '@/actions/actionTypes'
import { produce } from 'immer'
import { arrayMove } from '@dnd-kit/sortable'

export const initialComponentState: componentState = {
  selectId: '',
  componentList: []
};

export const componentReducer = (
  state: componentState = initialComponentState, 
  { type, payload } : componentAction
) => {
  switch (type) {
    case ADD_COMPONENT:
      const nextState = produce(state, (draftState: componentState) => {
        const { selectId = '', componentList = [] } = draftState
        const index = componentList.findIndex((c: ComponentInfoType) => c.fe_id === selectId)
        if(index < 0) {
          draftState.componentList = [...componentList, payload]
        } else {
          // 当前有选中，就插入到选中的后面
          draftState.componentList?.splice(index + 1, 0, payload)
          // 易错： splice 直接改变原数组，不要直接将返回值赋值，splice未删除元素时会返回空数组
        }
        draftState.selectId = payload.fe_id
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
        const { componentList = [] } = draftState
        draftState.componentList = componentList.filter(item => item.fe_id !== payload)
        draftState.selectId = ''
      })
      return { ...state, ...delState }
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
