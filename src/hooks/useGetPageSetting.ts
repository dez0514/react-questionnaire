import { useSelector } from 'react-redux'
import { GlobalConfigState } from '@/types/reducer'

function useGetPageSetting() {
  const { pageSettingOption = {} } = useSelector((state: GlobalConfigState) => state.globalConfig)
  return pageSettingOption
}

export default useGetPageSetting