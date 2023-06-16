import { componentState, componentAction } from '@/types/reducer'
import { ADD_COMPONENT } from '@/actions/actionTypes'

export const initialComponentState: componentState = {
  componentList: []
};

export const componentsReducer = (
  state: componentState = initialComponentState, 
  { type, payload } : componentAction
) => {
  switch (type) {
    case ADD_COMPONENT:
      return { ...state, ...payload };
    default:
      return state;
  }
}
