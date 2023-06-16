import styled from 'styled-components'
import { Button, Space, Tag, Divider, Modal, message } from 'antd'
import { EditOutlined, StarOutlined, LineChartOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons'
import { ItemType } from '@/types'
import { useNavigate } from 'react-router-dom';
const CardBox = styled.div`
  padding: 20px 10px 10px;
  margin-bottom: 20px;
  background: #fff;
  display: flex;
  .left {
    flex: 1;
    .title {
      color: #1890ff;
      margin-left: 14px;
    }
  }
  .right {
    padding-left: 30px;
    flex-shrink: 0;
    .title {
      margin-right: 14px;
      .txt {
        font-weight: 600;
      }
    }
    .btns {
      text-align: right;
    }
  }
  .flex {
    display: flex;
    align-items: center;
    justify-content: right;
  }
  .btns {
    margin-top: 30px;
  }
`

function ListCard({ _id, title, isPublished, isStar, answerCount, createdAt  }: ItemType) {
  const navigate = useNavigate()
  const [modal, contextHolder] = Modal.useModal();
  const handleClickDel = () => {
    modal.confirm({
      title: '提示',
      content: `确定删除?`,
      cancelText: '取消',
      okText: '确定',
      onOk: () => {
        console.log('id===', _id)
        message.success('已删除')
      }
    })
  };
  return (
    <CardBox>
      { contextHolder }
      <div className='left'>
        <div className='title'>
          <Space>
            { isStar && <StarOutlined style={{ color: '#f9042f' }} /> }
            <span>{ title }</span>
          </Space>
        </div>
        <div className='btns'>
          <Space>
            <Button type="text" icon={<EditOutlined />} onClick={ () => navigate(`/question/edit/${_id}`) }>编辑问卷</Button>
            <Button type="text" icon={<LineChartOutlined />}>问卷统计</Button>
          </Space>
        </div>
      </div>
      <div className='right'>
        <div className='flex title'>
          <Tag color={ isPublished ? 'success' : 'default'}>{ isPublished ? '已发布' : '未发布'}</Tag>
          <Divider type="vertical" />
          <div className='txt'>答卷：{ answerCount }</div>
          <Divider type="vertical" />
          <div className='txt'>{ createdAt }</div>
        </div>
        <div className='btns'>
          <Space>
            <Button type="text" icon={<StarOutlined />}>{ isStar ? '取消标星': '标星' }</Button>
            <Button type="text" icon={<CopyOutlined />}>复制</Button>
            <Button type="text" icon={<DeleteOutlined />} onClick={handleClickDel}>删除</Button>
          </Space>
        </div>
      </div>
    </CardBox>
  )
}

export default ListCard