const express=require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

var i = 1;
const userRouter= require('./user');
const app = express()
//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/user',userRouter)

app.get('/',(req,res)=>{
  console.log(i++);
  res.send('<h1>hello world!!</h1>')
})


app.listen(9093,()=>{console.log('nodeApp')})


// const express = require('express')
// const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
//
// const userRouter = require('./user')
//
// const app = express()
// app.use(cookieParser())
// app.use(bodyParser.json())
// app.use('/user',userRouter)
// app.get('/',(req,res)=>{
//   console.log(1);
// })
// app.listen(9093,function(){
// 	console.log('Node app start at port 9093')
// })
