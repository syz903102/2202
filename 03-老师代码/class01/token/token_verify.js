// 引入模块
var jwt = require("jsonwebtoken");

// 密钥
var key = "ken_token";

// token
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtlbiIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNjU0ODI3ODU5LCJleHAiOjE2NTQ4Mjc4ODl9.t0bjPDauvS9x8whqKZ48aZffoTLCnC_n-hWWGfFAU9o";

// 验证
var token = jwt.verify(token, key, function (err) {
    if (err) {
        console.log("token失效,请重新登陆");
    } else {
        console.log("token验证成功,返回数据");
    }
});
