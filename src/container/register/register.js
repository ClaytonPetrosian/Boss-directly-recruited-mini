import React from 'react'
import Logo from '../../component/logo/logo'
import { List, Radio, Flex, WhiteSpace,WingBlank,Button,InputItem } from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
1
@connect(
  state=>state.user,
  {register}
)
class  Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user:'',
      pwd:'',
      repeatpwd:'',
      type:'genius'
    }
    this.handleRegister=this.handleRegister.bind(this)
  }
  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }
  handleRegister(){
    this.props.register(this.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <Logo></Logo>
        <List>
          {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
          <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
          <WhiteSpace />
          <InputItem onChange={v=>this.handleChange('pwd',v)} type='password'>密码</InputItem>
          <WhiteSpace />
          <InputItem onChange={v=>this.handleChange('repeatpwd',v)} type='password'>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem onChange={()=>this.handleChange('type','genius')} checked={this.state.type==='genius'} >
            牛人
          </RadioItem>
          <RadioItem onChange={()=>this.handleChange('type','boss')} checked={this.state.type==='boss'}>
            BOSS
          </RadioItem>
          <WhiteSpace />
        </List>
        <Button type='primary' onClick={this.handleRegister}>注册</Button>
      </div>
    )
  }
}
export default Register
