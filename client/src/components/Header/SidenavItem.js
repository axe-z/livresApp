import React from "react";
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SidenavItem = (props) => {
const items = [
  {
    type: 'navItem',
    icon: 'home',
    text: 'Accueil',
    link: '/',
    restricted: false
  },
  {
    type: 'navItem',
    icon: 'file-text-o',
    text: 'Mon Profile',
    link: '/user',
    restricted: true
  },
  {
    type: 'navItem',
    icon: 'file-text-o',
    text: 'Ajout d\'utilisateur',
    link: '/user/Enregistrement',
    restricted: true
  },
  {
    type: 'navItem',
    icon: 'file-text-o',
    text: 'Connection',
    link: '/login',
    restricted: false,
    exclude: true  //si login deja
  },
  {
    type: 'navItem',
    icon: 'file-text-o',
    text: 'Votre Collection',
    link: '/user/userCritiques',
    restricted: true
  },
  {
    type: 'navItem',
    icon: 'file-text-o',
    text: 'Ajout de Livre',
    link: '/user/add',
    restricted: true
  },
  {
    type: 'navItem',
    icon: 'file-text-o',
    text: 'Déconnection',
    link: '/logout',
    restricted: true
  }
];

const element = (item, i) => {
  return (
    <div key={i} className={item.type}>
      <Link to={item.link} style={{fontSize: '18px'}}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  );
};


const showItems = () =>
  props.user.login // check si connect marche..
    ? items.map((item, i) => {
        if (props.user.login.isAuth) {
          //si logguer
          return !item.exclude ? element(item, i) : null;
        } else {
          return !item.restricted ? element(item, i) : null;
        }
      })
    : null;


 return (
    <div>
    {showItems()}
    </div>
  )
};

const mapStateToProps = (state, props) => ({
   user: state.user
});

export default connect(mapStateToProps, null)(SidenavItem);
