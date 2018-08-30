import React from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
	state=>state
)
class Msg extends React.Component{
	componentDidMount() {

	}
  getLast(arr){
    return arr[arr.length-1]
  }
	render(){
    // if (!this.props.chat.chatmsg.length) {
    //   return null
    // }
  // 根据chatid，按照聊天用户分组
    const msgGroup={}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid]=msgGroup[v.chatid]||[]
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLast(a).createTime,
            b_last = this.getLast(b).createTime;
      return b_last - a_last
    })
    const Item = List.Item
    const Brief= Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users

		return (
      <div >

          {chatList.map(v=>{
            const lastItem=this.getLast(v)
            const targetId = v[0].from===userid?v[0].to:v[0].from
            const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
            if (!userinfo[targetId]) {
              return null
            }
            const name = userinfo[targetId].name
            const avatar = userinfo[targetId].avatar
            return (
              <List key={lastItem._id}>
                <Item
                  thumb={require(`../img/${avatar}.png`)}
                  extra={<Badge text={unreadNum}></Badge>}
                  arrow="horizontal"
                  onClick={()=>{
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                  >
                    {lastItem.content}
                  <Brief>
                    {name}
                  </Brief>
                </Item>
              </List>
            )
          })}
      </div>
    )
	}

}
export default Msg
