import React from 'react'
import Logo from '../../component/logo/logo'
import { List, Radio, Flex, WhiteSpace,WingBlank,Button,InputItem } from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import handleForm from '../../component/handle-form/handle-form'

@connect(
  state=>state.user,
  {register}
)
@handleForm
class  Register extends React.Component{
  constructor(props){
    super(props)
    this.handleRegister=this.handleRegister.bind(this)
  }
  componentDidMount(){
    this.props.handleChange('type','genius')
  }
  handleRegister(){
    this.props.register(this.props.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        {this.props.user?(this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null):null}
        <Logo></Logo>
        <List>
          {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
          <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
          <WhiteSpace />
          <InputItem onChange={v=>this.props.handleChange('pwd',v)} type='password'>密码</InputItem>
          <WhiteSpace />
          <InputItem onChange={v=>this.props.handleChange('repeatpwd',v)} type='password'>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem onChange={()=>this.props.handleChange('type','genius')} checked={this.props.state.type==='genius'} >
            牛人
          </RadioItem>
          <RadioItem onChange={()=>this.props.handleChange('type','boss')} checked={this.props.state.type==='boss'}>
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
