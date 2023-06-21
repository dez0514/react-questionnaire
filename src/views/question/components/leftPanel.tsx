import { useCallback } from 'react'
import styles from '../edit.module.scss'
import { Tabs, Typography } from 'antd';
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons'
import { componentConfGroup, ComponentConfType } from '@/components/QuestionComponents'
import { addComponent } from '@/actions'
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid'
import Layers from './layers';
const { Title } = Typography

function genComponent(c: ComponentConfType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()
  const handleClick = useCallback(() => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }, [])

  return (
    <div key={type} className={styles.component_wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

function LeftPanel() {
  const onChange = (key: string) => {
    console.log(key);
  };
  const ItemComps = () => {
    return (
      <div>
        {
          componentConfGroup.map(((group: any, index: number) => {
            const { groupId, groupName, components } = group
            return (
              <div key={groupId}>
                <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
                  {groupName}
                </Title>
                <div>{components.map((c: ComponentConfType) => genComponent(c))}</div>
              </div>
            )
          }))
        }
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
      children: <Layers />
    }
  ]
  return (
    <Tabs className={styles.panel_tabs} items={items} defaultActiveKey="1" onChange={onChange} />
  )
}

export default LeftPanel