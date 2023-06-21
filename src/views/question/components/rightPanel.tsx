import { useEffect, useState } from 'react'
import styles from '../edit.module.scss'
import { Tabs } from 'antd';
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import PageSetting from './pageSetting';
import ComponentProp from './componentProp';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';

function RightPanel() {
  const { selectId } = useGetComponentInfo()
  const [ tabKey, setTabKey ] = useState<string>('')
  const onChange = (key: string) => {
    setTabKey(key)
  };
  useEffect(() => {
    if(selectId) {
      setTabKey('1')
    } else {
      setTabKey('2')
    }
  }, [selectId])
  const items = [
    {
      key: '1',
      label: (<><FileTextOutlined />组件属性</>),
      children: <ComponentProp />
    },
    {
      key: '2',
      label: (<><SettingOutlined />页面设置</>),
      children: <PageSetting />
    }
  ]
  return (
    <Tabs className={styles.panel_tabs} items={items} activeKey={tabKey} onChange={onChange} />
  )
}

export default RightPanel