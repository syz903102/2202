// 引入mongodb模块
var mongodb = require('mongodb');
// 创建MongoClient,用来连接数据库
var MongoClient = mongodb.MongoClient;
// 声明数据库的地址,端口,名称
var dbUrl = 'mongodb://localhost:27017';

function MGDBconnect (res, cb) {
  // 连接数据库
  MongoClient.connect(dbUrl, function (err, db) {
    if (err) {
      console.log("连接数据库失败");
      res.send({ code: 404, msg: "连接数据库失败" })
    } else {
      console.log("连接数据库成功");
      // 使用数据库(有就使用没有就创建再使用)
      var dbase = db.db("my2202");

      cb(dbase, db);

    }
  })
}

// 添加一条
module.exports.insertOne = function (res, obj, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    dbase.collection(cName).insertOne(obj, function (err, result) {
      cb(err, result);
      // 关闭数据库
      db.close();
    })
  });
}

// 添加多条
module.exports.insertMany = function (res, arr, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    dbase.collection(cName).insertMany(arr, function (err, result) {
      cb(err, result);
      // 关闭数据库
      db.close();
    })
  });
}

// 查找数据
module.exports.find = function (res, findObj, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    // 判断前端没有传参默认为空对象  不能为undefined
    findObj.find ? '' : findObj.find = {};
    findObj.sort ? '' : findObj.sort = {};
    findObj.limit ? findObj.limit -= 0 : findObj.limit = 0;
    findObj.skip ? findObj.skip -= 0 : findObj.skip = 0;

    dbase.collection(cName).find(findObj.find).limit(findObj.limit).skip(findObj.skip).sort(findObj.sort).toArray(function (err, result) {
      cb(err, result);
      // 关闭数据库
      db.close();
    })
  });
}

// 删除一条
module.exports.deleteOne = function (res, obj, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    dbase.collection(cName).deleteOne(obj, function (err, result) {
      cb(err, result);
      // 关闭数据库
      db.close();
    })
  });
}

// 删除多条
module.exports.deleteMany = function (res, obj, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    dbase.collection(cName).deleteMany(obj, function (err, result) {
      cb(err, result);
      // 关闭数据库
      db.close();
    })
  });
}

// 修改一条
module.exports.updateOne = function (res, obj, updateObj, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    dbase.collection(cName).updateOne(obj, updateObj, function (err, result) {
      cb(err, result);
      // 关闭数据库
      db.close();
    })
  });
}

// 修改多条
module.exports.updateMany = function (res, obj, updateObj, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    dbase.collection(cName).updateMany(obj, updateObj, function (err, result) {
      cb(err, result);
      // 关闭数据库
      db.close();
    })
  });
}

// 查询条数
module.exports.count = function (res, obj, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    dbase.collection(cName).count(obj).then(function (count) {
      cb(count);
      // 关闭数据库
      db.close();
    })
  });
}

// 删除集合
module.exports.drop = function (res, cName, cb) {
  MGDBconnect(res, function (dbase, db) {
    dbase.collection(cName).drop(function (err, bool) {
      cb(err, bool);
      // 关闭数据库
      db.close();
    })
  });
}

