import { userState, userAction } from '@/types/reducer'
import { UPDATE_USERINFO, RESET_USERINFO } from '@/actions/actionTypes'

export const initialUserState: userState = {
  userinfo: {
    username: JSON.parse(sessionStorage.getItem('userinfo') || "{}")?.username || '',
    avatar: JSON.parse(sessionStorage.getItem('userinfo') || "{}")?.avatar || ''
  }
};

export const userReducer = (
  state: userState = initialUserState, 
  { type, payload } : userAction
) => {
  switch (type) {
    case UPDATE_USERINFO:
      const userinfo = { ...state.userinfo, ...payload }
      console.log('userinfo reducer===', { ...state, userinfo: userinfo })
      return { ...state, userinfo: userinfo };
    case RESET_USERINFO:
      return { userinfo: {} };
    default:
      return state;
  }
}
