import { useMemo } from 'react'
import { Alert } from 'antd';
import { useDispatch } from "react-redux"
import { changeComponentProps } from '@/actions'
import { getComponentConfByType, ComponentPropsType } from '@/components/QuestionComponents'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'

const NoProp = () => {
  return <Alert message="未选中组件" type="warning" showIcon />
}
const ComponentProp = () => {
  const dispatch = useDispatch()

  const { componentList = [], selectId = '' } = useGetComponentInfo()
  const selectedComponent = useMemo(() => {
    return componentList.find(item => item.fe_id && item.fe_id === selectId)
  }, [componentList, selectId])
  function changeProps(newProps: ComponentPropsType) {
    if (!selectedComponent) return
    const { fe_id } = selectedComponent
    console.log('fe_id==', fe_id)
    console.log('newProps==', newProps)
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  if (!selectId || !selectedComponent) return <NoProp />;
  const { type, props, isLocked, isHidden } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />;
  const { PropComponent } = componentConf
  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />
}

export default ComponentProp