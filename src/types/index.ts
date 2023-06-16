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
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createdAt: string
  isDeleted: boolean
}