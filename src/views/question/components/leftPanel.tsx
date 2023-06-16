// import { useState } from 'react'
import styles from '../edit.module.scss'
import { Tabs } from 'antd';
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons'

function LeftPanel() {
  const onChange = (key: string) => {
    console.log(key);
  };
  const ItemComps = () => {
    return (
      <div>
        { new Array(10).fill(0).map((item, index) => {
          return <div key={index}>{item}_1111</div>
        }) }
      </div>
    )
  }
  const ItemLayers = () => {
    return (
      <div>
        <div>5555</div>
      </div>
    )
  }
  const items = [
    {
      key: '1',
      label: (<><AppstoreOutlined />组件库</>),
      children: <ItemComps />
    },
    {
      key: '2',
      label: (<><BarsOutlined />图层</>),
      children: <ItemLayers />
    }
  ]
  return (
    <Tabs className={styles.panel_tabs} items={items} defaultActiveKey="1" onChange={onChange} />
  )
}

export default LeftPanel