import React from 'react'
import axios from 'axios'
import { withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'
@withRouter
@connect(
  state=>state.user,
  {loadData}
)
class  AuthRoute extends React.Component{
  componentDidMount(){
    //获取用户信息
    const publicList=['/login','/register']
    const pageList=['/login','/register','/boss','/genius','/msg','/chat','/me','/geniusinfo','/bossinfo']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname)>-1) {
      return null
    }
    axios.get('/user/info')
      .then(res=>{
        if (res.status==200) {
          if (res.data.code==0) {
            this.props.loadData(res.data.data);
            if (pageList.indexOf(this.props.location.pathname)==-1&&this.props.redirectTo) {
              this.props.history.push(this.props.redirectTo)
            }
          }else {
            this.props.history.push('/login');
          }
        }
      })
  }
  render(){
    return null
  }
}
export default AuthRoute
