import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { getQuestionService } from '@/api/question'
import { updateConfig, initComponent } from '@/actions'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  // ajax 加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionService({ id }, { loading: false })
      return data
    },
    {
      manual: true
    }
  )
  // 根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return
    const { title = '', desc = '', js = '', css = '', componentList = [] } = data.data as any
    // 获取默认的 selectId
    let selectId = ''
    if (componentList.length > 0) {
      selectId = componentList[0].fe_id // 默认选中第一个组件
    }
    // 把 componentList 存储到 Redux store 中
    dispatch(initComponent({ componentList, selectId, copiedComponent: null }))
    // 把 pageInfo 存储到 redux store
    dispatch(updateConfig({ pageSettingOption: { title, desc, js, css } }))
    dispatch(UndoActionCreators.clearHistory()) // 初始化时 先清掉 action 历史，防止过度撤销
    
  }, [data])

  // 判断 id 变化，执行 ajax 加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
