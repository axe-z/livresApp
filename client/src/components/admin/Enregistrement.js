import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

 import { getUsers, creerUser   } from './../../actions/index.js';

class Enregistrement  extends PureComponent {

state = {
  email: '',
  password: '',
  prenom: '',
  nom: '',
  error: ''
};
componentWillMount = () => {
  this.props.dispatch(getUsers())
    //let {email,password,prenom,nom} = this.state
    // console.log({email:email,password:password,prenom:prenom,nom:nom })
}


handleInputEmail = (e) => {
    e.preventDefault();
        this.setState({ email:e.target.value})
}
handleInputPassword = (e) => {
    e.preventDefault();
      this.setState( {password: e.target.value })
}

handleInputNom = (e) => {
    e.preventDefault();
      this.setState( {nom: e.target.value })
}

handleInputPrenom = (e) => {
    e.preventDefault();

    this.setState({ prenom: e.target.value })
}

submitForm = (e) => {
   e.preventDefault()
   this.setState({error: ''})

    let {email,password,prenom,nom} = this.state

     this.props.dispatch(creerUser({
           email:email,
           password:password,
           prenom:prenom,
           nom:nom
    }, this.props.user.users))

  }

componentWillReceiveProps = next => {
  if (next.user.success === false) {
    this.setState({ error: 'Verifiez si tout est ok, une erreur s\'est produite' });
  } else {
    this.setState({
      prenom: '',
      nom: '',
      email: '',
      password: ''
    });
  }
};


showUsers = (user) => (
      user.users ?
          user.users.map(item => (
              <tr key={item._id}>
                  <td>{item.prenom}</td>
                  <td>{item.nom}</td>
                  <td>{item.email}</td>
              </tr>
          ))
      :null
  )

  render() { 
    // console.log(this.props)
    return (
      <div className="rl_container">

        <form onSubmit={this.submitForm}>
                    <h2>Ajout Utilisateur</h2>

            <div className="form_element">
                <input
                    type="text"
                    placeholder="Entrez Prénom"
                    value={this.state.prenom}

                    onChange={this.handleInputPrenom}
                 />
            </div>

            <div className="form_element">
                <input
                    type="text"
                    placeholder="Entrez Nom"
                    value={this.state.nom}
                    onChange={this.handleInputNom}
                 />
            </div>

            <div className="form_element">
                <input
                    type="email"
                    placeholder="Entrez Courriel"
                    value={this.state.email}
                    onChange={this.handleInputEmail}
                 />
            </div>

            <div className="form_element">
                <input
                    type="password"
                    placeholder="Entrez Password"
                    value={this.state.password}
                    onChange={this.handleInputPassword}
                 />
            </div>

            <button type="submit">Ajout D'Utilisateur</button>
            <div className="error">
                {this.state.error}
            </div>

        </form>
        <div className="current_users" /*style={{maxWidth: 600, marginLeft: 'calc(50vw - 300px)'}}*/>
            <h4>Utilisateurs actuels:</h4>
            <table>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Courriel</th>
                    </tr>
                </thead>
                <tbody>
                    {this.showUsers(this.props.user)}
                </tbody>
            </table>
        </div>
       </div>
    );
  }
}

 const mapStateToProps = (state, props) => ({
    user: state.user
 });

export default connect(mapStateToProps, null)(Enregistrement);
