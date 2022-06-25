// 引入模块
var jwt = require("jsonwebtoken");

// 生成的信息
var content = {
    username: "ken",
    password: "123456"
}

// 密钥
var key = "ken_token";

// 签发
var token = jwt.sign(content, key, { expiresIn: 30 });
console.log(token);