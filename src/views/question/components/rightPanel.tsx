// import { useState } from 'react'
import styles from '../edit.module.scss'
import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'

function RightPanel() {
  const onChange = (key: string) => {
    console.log(key);
  };
  const ItemProps = () => {
    return (
      <div>
        { new Array(10).fill(0).map((item, index) => {
          return <div key={index}>{item}_1111</div>
        }) }
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
      label: (<><FileTextOutlined />属性</>),
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