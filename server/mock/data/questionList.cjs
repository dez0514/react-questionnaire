const Mock = require('mockjs')
const Random = Mock.Random

function getQuestionList(opt = {}) {
    const { len = 10, isDeleted = false, isStar = false } = opt
    const list = []
    for (let i = 0; i < len; i++) {
        list.push({
            key: Random.id(),
            _id: Random.id(),
            title: Random.ctitle(),
            isPublished: Random.boolean(),
            isStar,
            answerCount: Random.natural(50, 100),
            createdAt: Random.datetime(),
            isDeleted,  // 假删除
        })
    }
    return list
}

module.exports = getQuestionList
