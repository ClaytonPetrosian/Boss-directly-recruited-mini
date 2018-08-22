import React from 'react'
import { NavBar, Icon,WhiteSpace,WingBlank,Button,InputItem, TextareaItem } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'

class BossInfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:'',
      company:'',
      salary:'',
      desc:''
    }
  }
  onChange(key,val){
    this.setState({
        [key]:val
      })
  }

  render(){
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          rightContent={[
            <Icon key="1" type="ellipsis" />,
          ]}
        >BOSS完善信息</NavBar>
        <AvatarSelector
          selectAvatar={(img)=>{
            this.setState({
              avatar:img
            })
          }}
          ></AvatarSelector>
        <InputItem onChange={(v=>this.onChange('title',v))}>
          招聘职位
        </InputItem>
        <InputItem onChange={(v=>this.onChange('company',v))}>
          公司名称
        </InputItem>
        <InputItem onChange={(v=>this.onChange('salary',v))}>
          职位薪资
        </InputItem>
        <TextareaItem onChange={(v=>this.onChange('desc',v))}
          rows={3}
          autoHeight
          title='职位要求'
          >
        </TextareaItem>
      </div>
    )
  }
}
export default BossInfo
