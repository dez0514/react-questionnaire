import { get, post } from '@/utils/fetch'

export const getQuestionList = (params: any = {}, config: any = {}) => {
  return get('/api/question', params, config)
}

export const createQuestion = (params: any = {}, config: any = {}) => {
  return post('/api/question', params, config)
}

// 获取单个问卷信息
export const getQuestionService = (params: any = {}, config: any = {}) => {
  return get('/api/question/:id', params, config)
}