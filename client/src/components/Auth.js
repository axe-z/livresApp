import React, { Component } from 'react';
import { connect } from 'react-redux';

import { auth }from '../actions/authAction.js'

export default function(ComposedComp, refresh){
//va retourner le component
  class AuthCheck  extends Component {

    state = {
      loading: true
    }

    componentWillMount = () => {
         this.props.dispatch(auth());
    }

    componentWillReceiveProps = (next, prev) => {
         this.setState({loading: false })
      if(!next.user.login.isAuth){
         //console.log('next', next)
         if(refresh) {
            this.props.history.push('/login')
         }
      } else {
        if(refresh === false) {
          this.props.history.push('/user')
        }
      }
    }

    render() {
      let {loading} = this.state

      if(loading) {
        return <div className="loader">Un Instant... </div>

      } else if (this.props.user.login){
        // console.log(this.props.user)
        return  <ComposedComp {...this.props}  />
      }

      return (
        <div>

          <ComposedComp {...this.props}  />

        </div>
      );
    }
  }

   const mapStateToProps = (state, props) => ({
      user: state.user
   });

  return connect(mapStateToProps, null)(AuthCheck);
}
