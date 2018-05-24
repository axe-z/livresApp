import React from "react";
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home.js';
import Layout from './components/Layout.js';
import LivreItem from './components/livres/LivreView.js';
import Login from './components/admin/Login.js';
import UserPost from './components/admin/UserPost.js'

import Auth from './components/Auth.js';
import User from './components/admin/User.js';
import AddLivre from './components/admin/AddLivre.js';
import EditLivre from './components/admin/EditLivre.js';
import Enregistrement from './components/admin/Enregistrement.js';
import Logout from './components/admin/Logout.js';

const Routes = (props) => {
 return (
    <Layout>

     <Switch>
       <Route path="/" exact component={Auth(Home, null)}/>
       <Route path="/login" exact component={ Auth(Login, false) }/>
       <Route path="/user" exact component={Auth(User, true)}/>
       <Route path="/user/add" exact component={Auth(AddLivre, true)}/>
       <Route path="/logout" exact component={ Auth(Logout, true) }/>
       <Route path="/user/enregistrement" exact component={Auth(Enregistrement, true)}/>
       <Route path="/user/userCritiques" exact component={Auth(UserPost, true)}/>
       <Route path="/user/editCritiques/:id" exact component={Auth(EditLivre, true)}/>
       <Route path="/livres/:id" exact component={Auth(LivreItem, null)}/>
     </Switch>
   </Layout>
  )
};

export default Routes;
