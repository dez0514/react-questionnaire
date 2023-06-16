import styles from '../edit.module.scss'
import { Button, Space } from 'antd'
import { LeftOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'

function EditHeader() {
  return (
    <div className={styles.top_header}>
      <div className={styles.header_left}>
        <Button type="link" icon={<LeftOutlined />}>返回</Button>
        <h3 style={{ marginLeft: '10px', cursor: 'pointer' }}>新建问卷 01-02 <EditOutlined style={{marginLeft: '5px'}} /></h3>
      </div>
      <div className={styles.header_center}>operate btns</div>
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