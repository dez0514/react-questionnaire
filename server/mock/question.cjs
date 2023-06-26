const Mock = require('mockjs')
const Random = Mock.Random
const getQuestionList = require('./data/questionList.cjs')
const getComponentList = require('./data/componentList.cjs')

module.exports = [
  {
    // 创建问卷
    url: '/api/question',
    method: 'post',
    response() {
        return {
          code: 0,
          data: Random.id()
        }
    }
  },
  {
    // 详情
    url: '/api/question/:id',
    method: 'get',
    response() {
      return {
        code: 0,
        data: {
          id: Random.id(),
          name: Random.ctitle(),
          desc: '问卷描述',
          js: '',
          css: '',
          isDeleted: false,
          isPublished: true,
          componentList: getComponentList()
        }
      }
    }
  },
  {
    // 列表
    url: '/api/question',
    method: 'get',
    response(ctx) {
      const { query = {} } = ctx
      const isDeleted = query.isDeleted === 'true' ? true : false
      const isStar = query.isStar === 'true' ? true : false
      const pageSize = parseInt(query.pageSize) || 10
      const pageNumber = parseInt(query.pageNumber) || 1
      const total = 20 // 总数 用于分页
      const pages = Math.ceil(total / pageSize)
      let list = [] // 当前页数据
      if(pageNumber < pages) {
        list = getQuestionList({ len: pageSize, isDeleted, isStar })
      } else if(pageNumber === pages) { // 最后一页数据
        const len = total - ((pageNumber - 1) * pageSize)
        list = getQuestionList({ len: len, isDeleted, isStar })
      }
      // 当收到的pageNumber 大于总页数时 返回 []
      return {
        code: 0,
        data: {
          list: list, // 当前页数据
          total: total // 总数，用于分页
        }
      }
    }
  }
]