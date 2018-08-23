import React from 'react'
import { List, InputItem, WhiteSpace,WingBlank,Button } from 'antd-mobile';
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'


function Genius(){
  return <h2>Genius</h2>
}
function Msg(){
  return <h2>Msg</h2>
}
function User(){
  return <h2>User</h2>
}

@connect(
  state=>state
)
class  Dashboard extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:''
    }

  }

  render(){
    const user = this.props.user
    const {pathname} = this.props.location
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component:Boss,
        hide:user.type=='genius'
      },
      {
        path:'/genius',
        text:'Boss',
        icon:'job',
        title:'BOSS列表',
        component:Genius,
        hide:user.type=='boss'
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg
      },
      {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User
      }
    ]
    return(
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <div style={{marginTop:45}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}
export default Dashboard
