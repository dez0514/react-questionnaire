import { useState, useEffect } from 'react'
import { Input, Pagination, Empty } from 'antd';
import ListCard from './components/card';
import { useTitle } from 'ahooks'
import { ListWrap } from './components/styled'
import { ItemType } from '@/types'
const dataSource = [
  {
    key: '1',
    id: 'q1',
    title: '问卷q1',
    isPub: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2023-06-14 14:00:00'
  },
  {
    key: '2',
    id: 'q2',
    title: '问卷q2',
    isPub: false,
    isStar: false,
    answerCount: 5,
    createdAt: '2023-06-14 15:00:00'
  }
];
function Star() {
  useTitle('ddm问卷-标星问卷')
  const [list, setList] = useState<ItemType[]>([])
  const onSearch = (value: string) => console.log(value);
  useEffect(() => {
    setList(dataSource)
  }, [])
  return (
    <ListWrap>
      <div className='top-search'>
        <h2>标星问卷</h2>
        <Input.Search placeholder="输入标题搜索" onSearch={onSearch} style={{ width: 260 }} />
      </div>
      { list.length === 0 && <Empty /> }
      <div className='lists'>
        {
          list.map((item: ItemType) => {
            const { key, ...rest } = item
            return <ListCard key={key} {...rest}></ListCard>
          })
        }
      </div>
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ textAlign: 'right', padding: '10px', background: '#fff' }}>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </ListWrap>
  )
}

export default Star