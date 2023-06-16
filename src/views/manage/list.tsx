import { useState, useEffect, useRef } from 'react'
import { Input, Empty, Spin } from 'antd';
import ListCard from './components/card';
import { useTitle } from 'ahooks'
import { ListWrap } from './components/styled'
import { ItemType } from '@/types'
import { debounce } from '@/utils';
import { getQuestionList } from '@/api/question'

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
  const [pageNumber, setPageNumber] = useState<number>(1)
  // const [total, setTotal] = useState<number>(0)
  const [initLoad, setInitLoad] = useState<boolean>(false) // 开始没数据时第一次的loading
  const [loadState, setLoadState] = useState<LoadType>(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const onSearch = (value: string) => {
    console.log(value)
    getList()
  }
  const getList = (pageNumber = 1) => {
    setLoadState(1)
    const params = {
      pageSize,
      pageNumber
    }
    if(list.length === 0 && pageNumber === 1) {
      setInitLoad(true)
    }
    getQuestionList(params, { loading: false }).then((res: any) => {
      console.log('res===', res)
      setInitLoad(false)
      if(res.code === 0) {
        if(res.data.list.length === 0) {
          if(pageNumber === 1) {
            // 无数据
            setList([])
          } else {
            setLoadState(2)
          }
        } else {
          console.log(res)
          if(pageNumber === 1) {
            setList(res.data.list)
          } else {
            const temp = list.concat(res.data.list)
            setList(temp)
          }
          setPageNumber(pageNumber)
          setLoadState(0)
        }
      } else {
        setLoadState(0)
      }
    })
  }
  const handleScroll = (e: any) => {
    const { scrollHeight, scrollTop, clientHeight } = e.srcElement;
    if(loadState !== 0) return; // 加载中 和 没有更多 都不走了。
    if(scrollHeight - scrollTop === clientHeight) {
      console.log("触底啦！");
      getList(pageNumber + 1)
    }
  }
  const scrollCallback = debounce(handleScroll, 300)
  useEffect(() => {
    const parentNode = scrollRef.current?.parentNode;
    if (parentNode) {
      parentNode.addEventListener("scroll", scrollCallback);
      return () => {
        // debugger
        parentNode.removeEventListener("scroll", scrollCallback);
      };
    }
  }, [scrollRef, scrollCallback])
  useEffect(() => {
    getList()
  }, [])
  return (
    <ListWrap ref={scrollRef}>
      <div className='top-search'>
        <h2>我的问卷</h2>
        <Input.Search placeholder="输入标题搜索" onSearch={onSearch} style={{ width: 260 }} />
      </div>
      { list.length === 0 && !initLoad && <Empty  style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} /> }
      { list.length === 0 && initLoad && <Spin  style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} /> }
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