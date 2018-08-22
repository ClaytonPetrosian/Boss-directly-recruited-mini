import React from 'react'
import { Grid,List } from 'antd-mobile';

class AvatarSelector extends React.Component{
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    const avatarList  = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(v=>({
                          icon:require(`../img/${v}.png`),
                          text:v
                        }))
    const gridHeader = this.state.text?(<div>
                                          <span>已选择头像</span>
                                          <img src={this.state.icon} alt='' style={{width:20}}></img>
                                        </div>):<div>请选择头像</div>
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarList}
            columnNum={5}
            onClick={e=>{
              this.setState(e)
              this.props.selectAvatar(e.text)
            }}
          />
        </List>
      </div>
    )
  }
}
export default AvatarSelector
