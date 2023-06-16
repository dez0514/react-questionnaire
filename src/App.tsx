import RootRouter from "./router"
import { Spin } from 'antd'
import { useSelector } from "react-redux";
import { GlobalConfigState } from '@/types/reducer'
function App() {
  const { showGlobalLoading } = useSelector((state: GlobalConfigState) => state.globalConfig)
  return (
    <Spin
      spinning={showGlobalLoading}
      tip='Loading...'
      style={{ maxHeight: 'unset', minHeight: '100vh' }}
    >
      <RootRouter />
    </Spin>
  )
}

export default App
