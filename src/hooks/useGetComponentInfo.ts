import { useSelector } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer'

function useGetComponentInfo() {
  const { componentList = [], selectId = '' } = useSelector((state: GlobalConfigState) => state.componentReducer)
  return { componentList, selectId }
}

export default useGetComponentInfo