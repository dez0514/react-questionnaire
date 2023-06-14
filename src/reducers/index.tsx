import { combineReducers } from 'redux'
import { configReducer } from './config'
import { GlobalConfigState } from '@/types/reducer'
import { configureStore } from "@reduxjs/toolkit";



const reducers = combineReducers<GlobalConfigState>({
  globalConfig: configReducer
})

const store = configureStore({
  reducer: reducers
})

export default store
