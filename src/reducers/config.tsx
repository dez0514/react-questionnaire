import { configState, configAction } from '@/types/reducer'
import { UPDATE_CONFIG } from '@/actions/actionTypes'

export const initialConfigState: configState = {
  showGlobalLoading: false,
  pageSettingOption: {
    title: '',
    desc: '',
    js: '',
    css: ''
  }
};

export const configReducer = (
  state: configState = initialConfigState, 
  { type, payload } : configAction
) => {
  switch (type) {
    case UPDATE_CONFIG:
      if(payload.pageSettingOption) {
        return {
          ...state,
          ...payload, 
          pageSettingOption: { ...state.pageSettingOption ,...payload.pageSettingOption }
        };
      }
      return { ...state, ...payload };
    default:
      return state;
  }
}
