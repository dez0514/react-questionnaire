import { useSelector } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer'

function useGetComponentInfo() {
  const { componentList = [], selectId = '', copiedComponent } = useSelector((state: GlobalConfigState) => state.componentReducer)
  const selectedComponent = componentList.find(c => c.fe_id === selectId)
  return { componentList, selectId, selectedComponent, copiedComponent }
}

export default useGetComponentInfo