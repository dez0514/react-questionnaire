import { configState, configAction } from '@/types/reducer'
import { UPDATE_CONFIG } from '@/actions/actionTypes'

export const initialConfigState: configState = {
  showGlobalLoading: false
};

export const configReducer = (
  state: configState = initialConfigState, 
  { type, payload } : configAction
) => {
  switch (type) {
    case UPDATE_CONFIG:
      return { ...state, ...payload };
    default:
      return state;
  }
}
