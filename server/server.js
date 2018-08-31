import expres from 'express'
import bodyParser  from 'body-parser'
import cookieParser  from 'cookie-parser'
import model  from './model'
import path  from 'path'
import React from 'react'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import App from '../src/app'

const User = model.getModel('user')
const Chat = model.getModel('chat')

import {renderToString} from 'react-dom/server'

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userRouter= require('./user');

io.on('connection',(soc)=>{
  console.log('login!!');
  soc.on('sendMsg',(data)=>{
    console.log(data);
    const {from,to,msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},(err,doc)=>{
      console.log(doc._doc.createTime);
      io.emit('recvMsg',Object.assign({},doc._doc))
    })
  })
})


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser())
app.use('/user',userRouter)
app.use((req,res,next)=>{
  if(req.url.startsWith('/user/')||req.url.startsWith('/static/')){
    return next()
  }
  const store = createStore(reducers,compose(
    applyMiddleware(thunk)
  ))
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter>
        <App></App>
      </StaticRouter>
    </Provider>)
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/',express.static(path.resolve('build')))
server.listen(9093,()=>{console.log('nodeApp')})
