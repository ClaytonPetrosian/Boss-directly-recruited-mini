import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom';

@withRouter
class UserCard extends React.Component{
	static propTypes = {
		userlist: PropTypes.array.isRequired
	}
	handleClick(v){
		this.props.history.push(`/chat/${v._id}`)
	}
	render(){
		const Header = Card.Header
		const Body = Card.Body
		return (
			<div id="user-card">
				<WingBlank>
				<WhiteSpace></WhiteSpace>
					{this.props.userlist.map(v=>(
						v.avatar?(
							<div className="user-card-item"	key={v._id}>
								<Card
									onClick={this.handleClick.bind(this,v)}
									>
									<Header
										title={v.user}
										thumb={require(`../img/${v.avatar}.png`)}
										extra={<span>{v.title}</span>}
									></Header>
									<Body>
										{v.type=='boss'? <div>公司:{v.company}</div> :null}
										<WhiteSpace></WhiteSpace>
										{v.desc.split('\n').map(d=>(d==''?null:<div key={d}>{d}</div>))}
										<WhiteSpace></WhiteSpace>
										{v.type=='boss'? <div>薪资:{v.salary}</div> :null}
									</Body>
								</Card>
							</div>
							):null
					))}

				</WingBlank>
			</div>
		)


	}
}
export default UserCard
