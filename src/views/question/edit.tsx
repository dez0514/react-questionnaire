import EditHeader from './components/eheader'
import LeftPanel from './components/leftPanel'
import RightPanel from './components/rightPanel'
import CenterPanel from './components/centerPanel'
import styles from './edit.module.scss'

function Edit() {
  return (
    <div className={styles.edit_page}>
      <EditHeader />
      <div className={styles.content}>
        <div className={styles.left_wrap}>
          <LeftPanel />
        </div>
        <div className={styles.center_wrap}>
          <CenterPanel />
        </div>
        <div className={styles.right_wrap}>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

export default Edit