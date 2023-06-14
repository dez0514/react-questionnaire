import { ReactNode } from "react"
import { LoaderFunction } from 'react-router-dom'

export type RouterType = {
  // route props
  path?: string
  fullPath?: string
  element?: ReactNode | null
  children?: RouterType[]
  loader?: LoaderFunction
  id?: string
  // menu props
  icon?: ReactNode
  name?: string
  label?: string | ReactNode
  hide?: boolean
  // auth props
  roles?: string[]
}

export interface ItemType {
  key: string
  id: string
  title: string
  isPub: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
}
