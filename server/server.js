const express=require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')


const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userRouter= require('./user');

io.on('connection',(soc)=>{
  console.log('login!!');
  soc.on('sendMsg',(data)=>{
    const {from,to,msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},(err,doc)=>{
      io.emit('recvMsg',Object.assign({},doc._doc))
    })
  })
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/user',userRouter)

server.listen(9093,()=>{console.log('!!')})
