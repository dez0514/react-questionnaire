import { get } from '@/utils/fetch'

export const getQuestionList = (params: any = {}, config: any = {}) => {
  return get('/api/question/1', params, config)
}