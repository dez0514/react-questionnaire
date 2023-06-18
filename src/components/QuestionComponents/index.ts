import type { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput/index'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle/index'

// 统一，各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一，各个组件的统计属性类型
// type ComponentStatPropsType = QuestionRadioStatPropsType & QuestionCheckboxStatPropsType

// 统一，组件的配置 type
export type ComponentConfType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  // PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
  // StatComponent?: FC<ComponentStatPropsType>
}

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf
]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf]
  },
  // {
  //   groupId: 'chooseGroup',
  //   groupName: '用户选择',
  //   components: [QuestionRadioConf, QuestionCheckboxConf],
  // },
]

export function getComponentConfByType(type: string) {
  return componentConfList.find(c => c.type === type)
}
