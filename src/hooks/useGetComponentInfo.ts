import { useSelector } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer'

function useGetComponentInfo() {
  const { componentList = [], selectId = '', copiedComponent } = useSelector((state: GlobalConfigState) => state.componentReducer.present)
  const selectedComponent = componentList.find(c => c.fe_id === selectId)
  return { componentList, selectId, selectedComponent, copiedComponent }
}

export default useGetComponentInfo

// 获取 redux 的 调用历史 用于 撤销 重做 按钮
export const useComponentActionHistory = () => {
  const { past, future } = useSelector((state: GlobalConfigState) => state.componentReducer)
  return { past, future }
}