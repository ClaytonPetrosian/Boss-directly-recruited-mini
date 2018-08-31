import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WhiteSpace,WingBlank,Button } from 'antd-mobile';
import {login,resetpwd} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import handleForm from '../../component/handle-form/handle-form'

@connect(
  state=>state.user,
  {login,resetpwd}
)
@handleForm
class  Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:''
    }
    this.register=this.register.bind(this)
    this.handleLogin=this.handleLogin.bind(this)
  }
  register(){
    this.props.history.push('/register')
  }
  handleLogin(){
    this.props.login(this.props.state)
  }
  render(){
    return(
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <InputItem onChange={v=>this.props.handleChange('pwd',v)} type='password'>密码</InputItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleLogin}>登陆</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login
