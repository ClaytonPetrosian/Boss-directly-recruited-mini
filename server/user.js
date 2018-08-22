const express = require('express');
const utils = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const _filter = {'pwd':0,'__v':0}


Router.get('/list',(req,res)=>{
 User.find({},(err,doc)=>{
   return res.json(doc)
 })
})
Router.post('/login',(req,res)=>{
  const {user,pwd}=req.body
  User.findOne({user,pwd:md5Pwd(pwd)}, _filter ,(err,doc)=>{
    if (!doc) {
      return res.json({code:1,msg:'用户名或密码错误'})
    }
    res.cookie('userId',doc._id)
    return res.json({code:0,data:doc})
  })
})
Router.post('/register',(req,res)=>{
  const {user,pwd,type}=req.body
  User.findOne({user},(err,doc)=>{
    if (doc) {
      return res.json({code:1,msg:'用户名重复'})
    }
    const userModel = new User({user,pwd:md5Pwd(pwd),type})
    userModel.save((e,d)=>{
      if (e) {
        return res.json({code:1,msg:"后端出错了"})
      }
      const {user,type,_id} = d
      res.cookie('userId',_id)
      return res.json({code:0,data:{user,type,_id}})
    })
    // User.create({user,pwd:md5Pwd(pwd),type},(e,d)=>{
    //   if (e) {
    //     return res.json({code:1,msg:"后端出错了"})
    //   }
    //   return res.json({code:0})
    // })
  })
})

Router.get('/info',(req,res)=>{
  const {userId} =req.cookies
  if (!userId) {
    return res.json({code:1})
  }
  User.findOne({_id:userId},_filter,(e,d)=>{
    if (e) {
      return res.json({code:1,msg:"后端出错了"})
    }
    if (d) {
      return res.json({code:0,data:d})
    }
  })
})

function md5Pwd(pwd){
    const salt = 'i_want_to_fuck_all_beautiful_girl_3r29#4dsf!ndk*&bf3%'
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router
