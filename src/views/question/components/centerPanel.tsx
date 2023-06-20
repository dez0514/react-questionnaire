// import { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { ComponentInfoType, GlobalConfigState } from '@/types/reducer'
import { getComponentConfByType } from '@/components/QuestionComponents'
import { setSelectId, moveComponent } from '@/actions'
import styles from '../edit.module.scss'
import classNames from "classnames"
import SortableContainer from "@/components/DndKitDragSortable/SortableContainer"
import SortableItem from "@/components/DndKitDragSortable/SortableItem"
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo // 每个组件的信息，是从 redux store 获取的（服务端获取）
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}
function CenterPanel() {
  const dispatch = useDispatch()
  const { componentList = [], selectId = '' } = useSelector((state: GlobalConfigState) => state.componentReducer, shallowEqual)
  function handleClick(event: React.MouseEvent, id: string) {
    event.stopPropagation() // 阻止冒泡
    if(selectId === id) {
      dispatch(setSelectId(''))
    } else {
      dispatch(setSelectId(id))
    }
  }
  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div>
        {
          componentList.map(c => {
            const { fe_id, isLocked } = c
            const wrapperDefaultClassName = styles.center_component_wrapper
            const selectedClassName = styles.selected
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === selectId,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div className={wrapperClassName} onClick={(e: React.MouseEvent) => handleClick(e, fe_id)}>
                  <div className={styles.component}>{genComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })
        }
      </div>
    </SortableContainer>
  )
}

export default CenterPanel