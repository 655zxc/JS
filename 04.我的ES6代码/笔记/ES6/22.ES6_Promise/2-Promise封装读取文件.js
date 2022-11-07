//1. 引入 fs 模块
const fs = require('fs');

//2. 调用方法读取文件(原始方法 不用Promise)
// fs.readFile('./resources/为学.md', (err, data)=>{
    //err是错误对象 没错err就是null 
    //data是读取出来的结果
//     //如果失败, 则抛出错误
//     if(err) throw err;
//     //如果没有出错, 则输出内容
//     console.log(data.toString());
// });

//3. 使用 Promise 封装
const p = new Promise(function(resolve, reject){
    fs.readFile("./resources/为学.md", (err, data)=>{
        //判断如果失败
        if(err) reject(err);//设置Promise为失败 并且设置失败的值是错误对象err
        //如果成功
        resolve(data);//reject执行后 resolve就不执行了
    });
});

p.then(function(value){
    console.log(value.toString());
}, function(reason){
    console.log("读取失败!!");

});
