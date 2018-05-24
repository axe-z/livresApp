import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserCritiques } from './../../actions'
import moment from 'moment';
import { Link } from 'react-router-dom';

class UserPost  extends Component {


componentWillMount = () => {
  // console.log(this.props.user.login.id)
  this.props.dispatch(getUserCritiques(this.props.user.login.id))
}

showUserCritiques = (user) => (
    user.userCritiques ?
        user.userCritiques.map(item => (
            <tr key={item._id}>
                <td><Link to={
                    `/user/editCritiques/${item._id}`
                }>
                    {item.name}
                </Link></td>
                <td>{item.author}</td>
                <td>
                    {moment(item.createAt).format("MM/DD/YY")}
                </td>
            </tr>
        ))
    :null
)

render() {
    let user = this.props.user;
    return (
        <div className="user_posts">
            <h4>Vos critiques:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.showUserCritiques(user)}
                </tbody>
            </table>
        </div>
    );
}
}


//pas besoin ...
 const mapStateToProps = (state, props) => ({
    user: state.user,
    // livres: state.livres
 });

export default connect(mapStateToProps, null)(UserPost);
