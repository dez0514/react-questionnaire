import { useState, Key } from 'react'
import { Input, Table, Pagination, Space, Button, Tag, message, Empty, Modal } from 'antd';
import { useTitle } from 'ahooks';
import { ListWrap } from './components/styled'

function Trash() {
  useTitle('ddm问卷-回收站')
  const [modal, contextHolder] = Modal.useModal();
  const [selectedRowIds, setSelectedRowIds] = useState<Key[]>([]);
  const onSelectChange = (newSelectedRowIds: Key[]) => {
    console.log('selectedRowIds changed: ', newSelectedRowIds);
    setSelectedRowIds(newSelectedRowIds);
  };
  const rowSelection = {
    selectedRowKeys: selectedRowIds,
    onChange: onSelectChange,
  };
  const onSearch = (value: string) => console.log(value);
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
  
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPub',
      key: 'isPub',
      render: (_: any, { isPub }:{ isPub: boolean }) => <Tag color={ isPub ? 'success' : 'default'}>{ isPub ? '已发布' : '未发布'}</Tag>
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
      { dataSource.length > 0 && <div style={{marginBottom: '20px', padding: '10px', background: '#fff' }}>
        <Space>
          <Button type='primary' disabled={selectedRowIds.length === 0}>恢复</Button>
          <Button danger disabled={selectedRowIds.length === 0} onClick={handleClickDel}>彻底删除</Button>
        </Space>
      </div>}
      { dataSource.length === 0 && <Empty /> }
      <Table rowKey="id" rowSelection={rowSelection} dataSource={dataSource} columns={columns} pagination={false} />
      <div style={{ paddingBottom: '20px' }}>
        <div style={{ textAlign: 'right', padding: '10px', background: '#fff', marginTop: '20px' }}>
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    </ListWrap>
  )
}

export default Trash