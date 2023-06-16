import { useState, useEffect } from 'react'
import { Input, Pagination, Empty } from 'antd';
import ListCard from './components/card';
import { useTitle } from 'ahooks'
import { ListWrap } from './components/styled'
import { ItemType } from '@/types'
import { getQuestionList } from '@/api/question'

function Star() {
  useTitle('ddm问卷-标星问卷')
  const pageSize = 6
  const [list, setList] = useState<ItemType[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const onSearch = (value: string) => {
    console.log(value)
    getList()
  }
  const getList = (pageNumber = 1) => {
    const params = {
      pageSize,
      pageNumber,
      isStar: true
    }
    getQuestionList(params).then((res: any) => {
      console.log('res===', res)
      if(res.code === 0) {
        setTotal(res.data.total || 0)
        setList(res.data.list || [])
        setPageNumber(pageNumber)
      }
    })
  }
  useEffect(() => {
    getList()
  }, [])
  return (
    <ListWrap>
      <div className='top-search'>
        <h2>标星问卷</h2>
        <Input.Search placeholder="输入标题搜索" onSearch={onSearch} style={{ width: 260 }} />
      </div>
      { list.length === 0 && <Empty style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} /> }
      <div className='lists'>
        {
          list.map((item: ItemType) => {
            const { key, ...rest } = item
            return <ListCard key={key} {...rest}></ListCard>
          })
        }
      </div>
      { list.length > 0 && <div style={{ paddingBottom: '20px' }}>
        <div style={{ textAlign: 'right', padding: '10px', background: '#fff' }}>
          <Pagination current={pageNumber} total={total} pageSize={pageSize} onChange={ (pageNumber) => getList(pageNumber) } />
        </div>
      </div> }
    </ListWrap>
  )
}

export default Star