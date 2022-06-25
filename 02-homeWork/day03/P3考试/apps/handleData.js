// 引入模块
var mongodb = require('mongodb')
var db = require('../modules/db')
var cName = 'syz06231653'
//渲染
module.exports.list = (req, res) => {
    let obj = {} = req.query
    db.find(res, obj, cName, (err, data) => {
        if (err) {
            res.send({ code: 404, msg: '渲染失败' })
        } else {
            res.send({ code: 200, msg: '渲染成功', data })
        }
    })
}
//添加
module.exports.add = (req, res) => {
    let obj = req.body
    db.insertOne(res, obj, cName, (err, data) => {
        if (err) {
            res.send({ code: 404, msg: '添加失败' })
        } else {
            res.send({ code: 200, msg: '添加成功' })
        }
    })
}
//删除
module.exports.del = (req, res) => {
    let obj = {
        _id: mongodb.ObjectId(req.query.id),
    }
    db.deleteOne(res, obj, cName, (err, data) => {
        if (err) {
            res.send({ code: 404, msg: '删除失败' })
        } else {
            res.send({ code: 200, msg: '删除成功' })
        }
    })
}
//分页
module.exports.count = (req, res) => {
    let obj = req.query
    db.count(res, obj, cName, count => {
        res.send({ count })
    })
}