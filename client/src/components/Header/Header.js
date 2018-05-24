import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Nav from './Sidenav.js'

class Header extends Component {
  state = {
    showNav: false
  }

onHideNav = () => {
  this.setState(() => ({showNav: !this.state.showNav }))
}


  render() {
    return (

      <header>
        <div className="open_nav">
          
          <FontAwesome name="bars"
            onClick={this.onHideNav}
            style={{
              color: '#fff',
              padding: '10px',
              cursor: 'pointer'
            }}
          />

        </div>
        <Nav showNav={this.state.showNav}
          onHideNav={this.onHideNav}
         />
          <Link to="/" className="logo">La Bibliothèque</Link>
      </header>
    );
  }
}

export default Header;
