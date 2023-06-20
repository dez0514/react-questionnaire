import Component from './Component'
import { QuestionTitleDefaultProps } from './type'
import PropComponent from './PropComponent'

export * from './type'
// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
}