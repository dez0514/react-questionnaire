import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  p {
    margin: 20px 0;
  }
`
function Home() {
  const navigate = useNavigate()
  const [createNum, setCreateNum] = useState(0)
  const [publishNum, setPublishNum] = useState(0)
  const [replyNum, setReplyNum] = useState(0)
  useEffect(() => {
    setCreateNum(200)
    setPublishNum(100)
    setReplyNum(20)
  }, [])
  return (
    <FlexBox>
      <h1>问卷调查 | 在线投票</h1>
      <p>已累计创建问卷 {createNum} 份，发布问卷 {publishNum} 份，收到答卷 {replyNum} 份</p>
      <Button type='primary' onClick={() => navigate('/manage')}>开始使用</Button>
    </FlexBox>
  )
}

export default Home