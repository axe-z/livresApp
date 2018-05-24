import React from "react";
import SideNav from 'react-simple-sidenav';
import SidenavItem from './SidenavItem.js'


const Nav = (props) => {
 return (

    <SideNav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        background: '#242424',
        maxWidth: '30vw'
      }}
      >
      <SidenavItem />

    </SideNav>

  )
};

export default Nav;
