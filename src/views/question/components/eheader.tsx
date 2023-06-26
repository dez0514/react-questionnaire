import { ChangeEvent, useState, useRef, useEffect } from 'react'
import styles from '../edit.module.scss'
import { Button, Space, Input } from 'antd'
import type { InputRef } from 'antd'
import { LeftOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'
import useGetPageSetting from '@/hooks/useGetPageSetting'
import { useDispatch } from 'react-redux'
import { updateConfig } from '@/actions'
import EHeaderTool from './eheaderTool'

function EditHeader() {
  const useGetPageInfo = useGetPageSetting()
  const inputDom = useRef<InputRef>(null)
  const dispatch = useDispatch()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value.trim()
    dispatch(updateConfig({ pageSettingOption: { title }}))
  }
  const handleChangeEdit = () => {
    setIsEdit(!isEdit)
  }
  useEffect(() => {
    if(isEdit) {
      inputDom.current?.focus();
    }
  }, [isEdit]);
  return (
    <div className={styles.top_header}>
      <div className={styles.header_left}>
        <Button type="link" icon={<LeftOutlined />}>返回</Button>
        {isEdit && <Input ref={inputDom} placeholder="请输入标题" 
          value={useGetPageInfo?.title}
          onChange={handleChange}
          onPressEnter={handleChangeEdit}
          onBlur={handleChangeEdit} />
        }
        {!isEdit && <h3 style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={handleChangeEdit}>{useGetPageInfo?.title} <EditOutlined style={{marginLeft: '5px'}} /></h3>}
      </div>
      <div className={styles.header_center}>
        <EHeaderTool />
      </div>
      <div className={styles.header_right}>
        <Space>
          <Button icon={<CheckOutlined />}>保存</Button>
          <Button type="primary">发布</Button>
        </Space>
      </div>
    </div>
  )
}

export default EditHeader