import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionParagraphDefaultProps } from './type'

export * from './type'

// Paragraph 组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
