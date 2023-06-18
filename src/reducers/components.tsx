import { componentState, componentAction } from '@/types/reducer'
import { ADD_COMPONENT, SET_SELECT_ID } from '@/actions/actionTypes'
import { ComponentConfType } from '@/components/QuestionComponents'

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
      // const { selectId, componentList } = state
      // const index = componentList?.findIndex((c: any) => c.fe_id === selectId)
      // if (index < 0) {
      //   // 未选中任何组件
      //   draft.componentList.push(newComponent)
      // } else {
      //   // 选中了组件，插入到 index 后面
      //   draft.componentList.splice(index + 1, 0, newComponent)
      // }
      // draft.selectedId = newComponent.fe_id
      return state;
    case SET_SELECT_ID:
      console.log('payload55===', payload)
      return state;
    default:
      return state;
  }
}
