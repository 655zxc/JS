//
const fs = require('fs');

// fs是一个异步编程 他的函数会异步执行 也就是下面的箭头函数
//回调函数 形式
// fs.readFile('./resource/content.txt', (err, data) => {
//     // 如果出错 则抛出错误
//     if(err)  throw err;
//     //输出文件内容
//     console.log(data.toString());
// });

//Promise 形式
let p = new Promise((resolve , reject) => {
    fs.readFile('./resource/content.tx', (err, data) => {
        //如果出错
        if(err) reject(err);
        //如果成功
        resolve(data);
    });
});

//调用 then 
p.then(value=>{
    console.log(value.toString());
}, reason=>{
    console.log(reason);
});
//相当于上面的回调函数内容