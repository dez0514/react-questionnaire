import { useDispatch } from "react-redux"
import { ComponentInfoType } from '@/types/reducer'
import useGetComponentInfo from "@/hooks/useGetComponentInfo"
import { getComponentConfByType } from '@/components/QuestionComponents'
import { setSelectId, moveComponent, deleteComponent } from '@/actions'
import styles from '../edit.module.scss'
import classNames from "classnames"
import { Spin } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import SortableContainer from "@/components/DndKitDragSortable/SortableContainer"
import SortableItem from "@/components/DndKitDragSortable/SortableItem"
type PropsType = {
  loading: boolean
}
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo // 每个组件的信息，是从 redux store 获取的（服务端获取）
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return null
  const { Component } = componentConf
  return <Component {...props} />
}
function CenterPanel({ loading }: PropsType) {
  const dispatch = useDispatch()
  const { componentList, selectId } = useGetComponentInfo()
  function handleClick(event: React.MouseEvent, id: string) {
    event.stopPropagation() // 阻止冒泡
    if(selectId === id) {
      dispatch(setSelectId(''))
    } else {
      dispatch(setSelectId(id))
    }
  }
  function handleDelete(event: React.MouseEvent, id: string) {
    event.stopPropagation() // 阻止冒泡
    console.log('delete id===', id)
    dispatch(setSelectId(id))
    dispatch(deleteComponent())
  }
  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div>
        {
          componentList.filter(c => !c.isHidden).map(c => {
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
                  <div className={styles.icon_btn_wrap}>
                    <div className={classNames([styles.icon_btn, styles.del])} onClick={(e: React.MouseEvent) => handleDelete(e, fe_id)}>
                      <DeleteOutlined />
                    </div>
                  </div>
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