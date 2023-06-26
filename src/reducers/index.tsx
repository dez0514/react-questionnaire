import { combineReducers } from 'redux'
import { configReducer } from './config'
import { userReducer } from './user'
import { componentReducer } from './components'
import { GlobalConfigState } from '@/types/reducer'
import { configureStore } from "@reduxjs/toolkit";
import undoable, { excludeAction } from 'redux-undo'



const reducers = combineReducers<GlobalConfigState>({
  globalConfig: configReducer,
  userReducer: userReducer,
  // componentReducer: componentReducer
  componentReducer: undoable(componentReducer, {
    limit: 10, // 限制 undo 10 步
    filter: excludeAction([
      'componentReducer/initComponent',
      'componentReducer/setSelectId'
    ]),
  }),
})

const store = configureStore({
  reducer: reducers
})

export default store
