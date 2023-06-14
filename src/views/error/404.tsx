import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { CSSProperties } from 'react'

const styles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh'
}

function NotFound() {
  useTitle('404')
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div style={{...styles}}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={ handleClick }>Back Home</Button>}
      />
    </div>
  )
}

export default NotFound