import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './../../actions/index.js';

// {
//     "email": "dave@gmail.com",
//     "password": "12227"
// }


class Login  extends Component {

state = {
  email: '',
  password: '',
  error: '',
  success: false
}

submitForm = (e) => {
  e.preventDefault();
   //console.log(this.state)

   this.props.dispatch(loginUser(this.state))
    // this.props.user.login.email === this.state.email ? this.setState(() => ({success:true })) : null

}

componentWillReceiveProps(next) {

  if(next.user.login.isAuth) {
     this.props.history.push('/user')
  }
  //   console.log(next)  //{match: {…}, location: {…}, history: {…}, staticContext: undefined, user: {…}, …} tous les props
}

handleInputEmail = (e) => {
 this.setState({email: e.target.value })
}
handleInputPassword = (e) => {
 this.setState({password: e.target.value })
}
  render() {
    let user = this.props.user
    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
            <h2>Connection ici</h2>

            <label className="form_element">
                <input
                    type="email"
                    placeholder="Etrez votre Courriel"
                    value={this.state.email}
                    onChange={this.handleInputEmail}
                />
            </label>

            <div className="form_element">
                <input
                    type="password"
                    placeholder="Votre Mot De Passe"
                    value={this.state.password}
                    onChange={this.handleInputPassword}
                />
            </div>

            <button type="submit">Connection</button>

            <div className="error">
            {
                user.login ? <div>{user.login.message}</div> :null
            }
            </div>

        </form>


      </div>
    );
  }
}

 const mapStateToProps = (state, props) => ({
    user: state.user
 });

export default connect(mapStateToProps, null)(Login);
