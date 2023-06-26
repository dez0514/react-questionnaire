import { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import { useDispatch } from 'react-redux'
// import { ActionCreators as UndoActionCreators } from 'redux-undo'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { moveComponent, deleteComponent, changeComponentHidden, changeComponentLock, copySelectedComponent, pasteCopiedComponent } from '@/actions'

const EHeaderTool: FC = () => {
  const dispatch = useDispatch()
  const { selectId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectId)
  const isFirst = selectedIndex <= 0 // 第一个
  const isLast = selectedIndex + 1 >= length // 最后一个

  // 删除组件
  function handleDelete() {
    dispatch(deleteComponent())
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectId, isHidden: true }))
  }

  // 锁定组件
  function handleLock() {
    dispatch(changeComponentLock({ fe_id: selectId }))
  }

  // 复制
  function copy() {
    dispatch(copySelectedComponent())
  }

  // 粘贴
  function paste() {
    dispatch(pasteCopiedComponent())
  }

  // 上移
  function moveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  // 下移
  function moveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }

  // 撤销
  function undo() {
    // dispatch(UndoActionCreators.undo())
  }

  // 重做
  function redo() {
    // dispatch(UndoActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} disabled={!selectId}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden} disabled={!selectId}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
          disabled={!selectId}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button shape="circle" icon={<CopyOutlined />} onClick={copy} disabled={!selectId}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={!copiedComponent}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button shape="circle" icon={<UpOutlined />} onClick={moveUp} disabled={!selectId || isFirst}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={!selectId || isLast}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button shape="circle" icon={<UndoOutlined />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button shape="circle" icon={<RedoOutlined />} onClick={redo}></Button>
      </Tooltip>
    </Space>
  )
}

export default EHeaderTool
