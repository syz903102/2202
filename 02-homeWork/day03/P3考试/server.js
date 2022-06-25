// 引入模块
var express = require('express');
var app = express();
var path = require('path');
var hd = require('./apps/handleData')
//post 监听
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//静态资源托管
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public', 'jq')))
app.use(express.static(path.join(__dirname, 'public', 'images')))
app.use(express.static(path.join(__dirname, 'views')))
//接口
//渲染
app.get('/list', hd.list)
app.get('/count', hd.count)
app.get('/del', hd.del)
app.post('/add', hd.add)
//端口监听
app.listen(3000, function () {
    console.log('listening on http://localhost:3000');
})