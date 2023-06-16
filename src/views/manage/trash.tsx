import { useState, Key, useEffect } from 'react'
import { Input, Table, Pagination, Space, Button, Tag, message, Empty, Modal } from 'antd';
import { useTitle } from 'ahooks';
import { ListWrap } from './components/styled'
import { ItemType } from '@/types'
import { getQuestionList } from '@/api/question'

function Trash() {
  useTitle('ddm问卷-回收站')
  const pageSize = 9
  const [list, setList] = useState<ItemType[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [modal, contextHolder] = Modal.useModal();
  const [selectedRowIds, setSelectedRowIds] = useState<Key[]>([]);
  const getList = (pageNumber = 1) => {
    const params = {
      pageSize,
      pageNumber,
      isDeleted: true
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
  const onSelectChange = (newSelectedRowIds: Key[]) => {
    console.log('selectedRowIds changed: ', newSelectedRowIds);
    setSelectedRowIds(newSelectedRowIds);
  };
  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    onChange: onSelectChange,
  };
  const onSearch = (value: string) => {
    console.log(value)
    getList()
  }
  const handleClickDel = () => {
    modal.confirm({
      title: '提示',
      content: `确定删除[${selectedRowIds.join(',')}]?`,
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        message.success('已删除')
      }
    })
  };
  useEffect(() => {
    getList()
  }, [])
  
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (_: any, { isPublished }:{ isPublished: boolean }) => <Tag color={ isPublished ? 'success' : 'default'}>{ isPublished ? '已发布' : '未发布'}</Tag>
    },
    {
      title: '答卷',
      dataIndex: 'answerCount',
      key: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    }
  ];
  return (
    <ListWrap>
      { contextHolder }
      <div className='top-search'>
        <h2>回收站</h2>
        <Input.Search placeholder="输入标题搜索" onSearch={onSearch} style={{ width: 260 }} />
      </div>
      { list.length > 0 && <div style={{marginBottom: '20px', padding: '10px', background: '#fff' }}>
        <Space>
          <Button type='primary' disabled={selectedRowIds.length === 0}>恢复</Button>
          <Button danger disabled={selectedRowIds.length === 0} onClick={handleClickDel}>彻底删除</Button>
        </Space>
      </div>}
      { list.length === 0 && <Empty style={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} /> }
      { list.length > 0 && <Table rowKey="_id" rowSelection={rowSelection} dataSource={list} columns={columns} pagination={false} /> }
      { list.length > 0 && <div style={{ paddingBottom: '20px' }}>
        <div style={{ textAlign: 'right', padding: '10px', background: '#fff', marginTop: '20px' }}>
          <Pagination current={pageNumber} total={total} pageSize={pageSize} onChange={(pageNumber) => getList(pageNumber)} />
        </div>
      </div> }
    </ListWrap>
  )
}

export default Trash