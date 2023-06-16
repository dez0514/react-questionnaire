import { get, post } from '@/utils/fetch'

export const getQuestionList = (params: any = {}, config: any = {}) => {
  return get('/api/question', params, config)
}

export const createQuestion = (params: any = {}, config: any = {}) => {
  return post('/api/question', params, config)
}