import EditHeader from './components/eheader'
import LeftPanel from './components/leftPanel'
import RightPanel from './components/rightPanel'
import CenterPanel from './components/centerPanel'
import styles from './edit.module.scss'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import useGetPageSetting from '@/hooks/useGetPageSetting'
import { useTitle } from 'ahooks'

function Edit() {
  const { loading } = useLoadQuestionData()
  const { title = '' } = useGetPageSetting()
  useTitle(`问卷编辑 - ${title}`)
  return (
    <div className={styles.edit_page}>
      <EditHeader />
      <div className={styles.content}>
        <div className={styles.left_wrap}>
          <LeftPanel />
        </div>
        <div className={styles.center_wrap}>
          <CenterPanel loading={loading} />
        </div>
        <div className={styles.right_wrap}>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

export default Edit