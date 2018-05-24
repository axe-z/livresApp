import React from "react";

const User = props => {
   //console.log('props', props)
   let { prenom, nom, email } = props.user.login;
  return (
    <div className="user_container">
      <div className="avatar">
        <img src="/images/avatar.png" alt="avatar" />
      </div>
      <div className="nfo">
        <div>
          <span>Prénom: </span> {prenom}
        </div>
        <div>
          <span>Nom: </span> {nom}
        </div>
        <div>
          <span>Courriel: </span> {email}
        </div>
      </div>
    </div>
  );
};


export default User;
