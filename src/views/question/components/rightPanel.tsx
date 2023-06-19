// import { useState } from 'react'
import styles from '../edit.module.scss'
import { Tabs, Alert } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'

function RightPanel() {
  const onChange = (key: string) => {
    console.log(key);
  };
  const ItemProps = () => {
    return (
      <div>
        <Alert message="未选中组件" type="warning" showIcon />
      </div>
    )
  }
  const ItemSetting = () => {
    return (
      <div>
        <div>5555</div>
      </div>
    )
  }
  const items = [
    {
      key: '1',
      label: (<><FileTextOutlined />组件属性</>),
      children: <ItemProps />
    },
    {
      key: '2',
      label: (<><SettingOutlined />页面设置</>),
      children: <ItemSetting />
    }
  ]
  return (
    <Tabs className={styles.panel_tabs} items={items} defaultActiveKey="1" onChange={onChange} />
  )
}

export default RightPanel