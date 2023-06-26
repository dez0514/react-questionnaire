const question = require('./question.cjs')
const user = require('./user.cjs')

const mockList = [
  ...question,
  ...user
]

module.exports = mockList