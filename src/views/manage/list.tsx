import { useState, useEffect, useRef } from 'react'
import { Input, Empty, Spin } from 'antd';
import ListCard from './components/card';
import { useTitle } from 'ahooks'
import { ListWrap } from './components/styled'
import { ItemType } from '@/types'
import { debounce } from '@/utils';
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
  },
  {
    key: '3',
    id: 'q3',
    title: '问卷q1',
    isPub: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2023-06-14 14:00:00'
  },
  {
    key: '4',
    id: 'q4',
    title: '问卷q2',
    isPub: false,
    isStar: false,
    answerCount: 5,
    createdAt: '2023-06-14 15:00:00'
  },
  {
    key: '5',
    id: 'q5',
    title: '问卷q1',
    isPub: true,
    isStar: true,
    answerCount: 3,
    createdAt: '2023-06-14 14:00:00'
  },
  {
    key: '6',
    id: 'q6',
    title: '问卷q2',
    isPub: false,
    isStar: false,
    answerCount: 5,
    createdAt: '2023-06-14 15:00:00'
  }
];
type LoadType = 0 | 1 | 2
function LoadMore({ state = 0 } : { state: LoadType }) {
  return (
    <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
      { state === 1 && <Spin /> }
      { state !== 1 && <div>{ state === 0 ? '加载更多' : '没有更多了' }</div> }
    </div>
  )
}
function List() {
  useTitle('ddm问卷-问卷列表')
  const pageSize = 6
  const [list, setList] = useState<ItemType[]>([])
  const [loadState, setLoadState] = useState<LoadType>(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const onSearch = (value: string) => console.log(value)
  useEffect(() => {
    console.log('scrollRef==', scrollRef)
    setList(dataSource)
    const handleScroll = (e: any) => {
      // todo 
      console.log('e==', e)
      const { scrollHeight, scrollTop, clientHeight } = e.srcElement;
      console.log('e1==', scrollHeight, scrollTop, clientHeight)
      if(scrollHeight - scrollTop === clientHeight) {
        console.log("触底啦！");
        setLoadState(1)
      } else {
        console.log("no");
        setLoadState(0)
      }
    }
    const scrollCallback = debounce(handleScroll, 300)
    scrollRef.current?.parentNode?.addEventListener("scroll", scrollCallback);
    return () => {
      scrollRef.current?.parentNode?.removeEventListener("scroll", scrollCallback);
    };
  }, [])
  return (
    <ListWrap ref={scrollRef}>
      <div className='top-search'>
        <h2>我的问卷</h2>
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
      { 
        list.length >= pageSize && (<LoadMore state={loadState} />)
      }
    </ListWrap>
  )
}

export default List