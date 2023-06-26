const Mock = require('mockjs')
const Random = Mock.Random

module.exports = [
  {
    url: '/api/user/info',
    method: 'get',
    response(ctx) {
      const { authorization } = ctx.request.headers
      // console.log('authorization===', authorization)
      if(!authorization) {
        return {
          code: 1,
          data: 'error'
        }
      }
      const username = authorization.split('#')[0] || ''
      return {
        code: 0,
        data: {
          username: username || Random.cname(),
          avatar: Random.image('100x100', '#1890ff', '#fff', 'png', 'admin')
        }
      }
    }
  },
  {
    url: '/api/user/login',
    method: 'post',
    response(ctx) {
      // console.log('ctx===', ctx)
      const { username } = ctx.request.body
      return {
        code: 0,
        data: `${username}#${Random.string(20)}`
      }
    }
  }
]