import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

class Boss extends React.Component{
  componentDidMount(){
    axios.get('/user/list?type=genius')
      .then(res=>{
        if (res.data.code==0) {
          this.setState({
            data:res.data.data
          })
        }
      })
  }
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }


  render(){
    console.clear();
    console.log(this.state.data);
    const Header=Card.Header;
    return (
      <WingBlank>
        {this.state.data.map(v=>(
          v.avatar?(
            <Card>
              <Header
                title={v.user}
                thumb={require(`../img/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
                >
              </Header>
            </Card>
          ):null
        ))}
      </WingBlank>
    )


  }
}
export default Boss
// {this.state.data.map(v=>(
//   v.avatar?(
//     <Card>
//       <Header
//         title={v.user}
//         thumb={require(`../img/${v.avatar}.png`)}
//         extra={<span>{v.title}</span>}
//         >
//       </Header>
//     </Card>
//   ):null
// ))}
