import React from 'react'
import { NavBar, Icon,WhiteSpace,WingBlank,Button,InputItem, TextareaItem } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'

@connect(
  state=>state.user,
  {update}
)
class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:'',
      desc:''
    }
  }
  onChange(key,val){
    this.setState({
        [key]:val
      })
  }

  render(){
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect&&redirect!=path?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          rightContent={[
            <Icon key="1" type="ellipsis" />,
          ]}
        >牛人完善信息</NavBar>
        <AvatarSelector
          selectAvatar={(img)=>{
            this.setState({
              avatar:img
            })
          }}
          ></AvatarSelector>
        <InputItem onChange={(v=>this.onChange('title',v))}>
          求职职位
        </InputItem>
        <TextareaItem onChange={(v=>this.onChange('desc',v))}
          rows={3}
          autoHeight
          title='个人简介'
          >
        </TextareaItem>
        <Button
          onClick={()=>{
            this.props.update(this.state)
          }}
          type='primary'>保存</Button>
      </div>
    )
  }
}
export default GeniusInfo
