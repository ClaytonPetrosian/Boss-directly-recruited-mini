import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'


import reducers from './reducer'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import Dashboard from './component/dashboard/dashboard'
import './index.css'

const reduxDevtools=window.devToolsExtension?window.devToolsExtension:()=>{}
const store = createStore(reducers,compose(
  applyMiddleware(thunk),
  reduxDevtools()
))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Dashboard}></Route>
        </Switch>

      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
//   //
// <Route path='/geniusboss' component={GeniusInfo}></Route>
  // <Route path='/qbl' component={QBL}></Route>
  // <Route path='/:location' component={Test}></Route>
  // function Erying(){
  //   return <h2>二营！</h2>
  // }
  // function QBL(){
  //   return <h2>骑兵连!</h2>
  // }
  // class Test extends React.Component {
  //   constructor(props) {
  //     super(props)
  //   }
  //   render(){
  //     console.log(this.props);
  //     return <h2>测试组件{this.props.match.params.location}</h2>
  //   }
  // }
