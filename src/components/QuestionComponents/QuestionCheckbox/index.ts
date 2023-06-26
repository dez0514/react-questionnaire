import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionCheckboxDefaultProps } from './type'

export * from './type'

export default {
  title: '多选',
  type: 'questionCheckbox', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionCheckboxDefaultProps,
}
