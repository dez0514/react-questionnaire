import { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { message, Input, Button, Space, Alert } from 'antd'
import { EyeInvisibleOutlined, EyeOutlined, LockOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { setSelectId, moveComponent, changeComponentTitle, changeComponentHidden, changeComponentLock } from '@/actions'
import SortableContainer from '@/components/DndKitDragSortable/SortableContainer'
import SortableItem from '@/components/DndKitDragSortable/SortableItem'
import styles from '../edit.module.scss'

const Layers: FC = () => {
  const { componentList, selectId } = useGetComponentInfo()
  const dispatch = useDispatch()

  // 记录当前正在修改标题的组件
  const [changingTitleId, setChangingTitleId] = useState('')

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== selectId) {
      // 当前组件未被选中，执行选中
      dispatch(setSelectId(fe_id))
      setChangingTitleId('')
      return
    }
    // 点击修改标题
    setChangingTitleId(fe_id)
  }

  // 修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectId) return
    dispatch(changeComponentTitle({ fe_id: selectId, title: newTitle }))
  }

  // 切换 隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换 锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(changeComponentLock({ fe_id }))
  }

  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  // 拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  if(componentList.length === 0) {
    return (
      <Alert message="未选中组件" type="warning" showIcon />
    )
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectId,
        })

        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.layer_wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {fe_id === changingTitleId && (
                  <Input
                    value={title}
                    onChange={changeTitle}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                )}
                {fe_id !== changingTitleId && <div style={{padding: '0 11px'}}>{title}</div>}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    icon={isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => changeHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => changeLocked(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
