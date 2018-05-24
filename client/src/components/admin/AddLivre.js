import React, { Component } from 'react';
import {addLivre , retireNewLivre } from './../../actions/index.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class AddLivre extends Component {
  state = {
    formData :{
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  };
  submitForm = e => {
    e.preventDefault();
  //  console.log(this.state.formData)
    this.props.dispatch(addLivre({...this.state.formData, ownerId: this.props.user.login.id }))
  };

  handleInput = (event, nom) => {
   let newState = { ...this.state.formData };
   newState[nom] = event.target.value;
  this.setState(() => ({formData:  newState }))
  };

  montreLivre = (livre) => {
    return (
      livre.post ?
       <div className="conf_link">
         Parfait  <Link to={`/livres/${livre.bookId}`}>
          Voir votre publication
         </Link>
       </div>
      : null
    )
  }
  componentWillUnmount = () => {
   this.props.dispatch(retireNewLivre())
  }

  render() {
    return (
      <div className="rl_container article">
        <form onSubmit={this.submitForm}>
          <h2>Ajouter une critique</h2>
          <div className="form_element">
            <input
              type="text"
              placeholder="entrez le nom"
              value={this.state.formData.name}
              onChange={event => this.handleInput(event, "name")}
            />
          </div>
          <div className="form_element">
            <input
              type="text"
              placeholder="entrez l'auteur "
              value={this.state.formData.author}
             onChange={event => this.handleInput(event, "author")}
            />
          </div>
          <textarea value={this.state.formData.review} onChange={event => this.handleInput(event, "review")}/>
          <div className="form_element">
            <input
              type="number"
              placeholder="entrez nombre de pages "
              value={this.state.formData.pages}
              onChange={event => this.handleInput(event, "pages")}
            />
          </div>
          <div className="form_element" onChange={event => this.handleInput(event, "rating")}>
            <select value={this.state.formData.rating}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form_element">
            <input
              type="number"
              placeholder="entrez le prix "
              value={this.state.formData.price}
              onChange={event => this.handleInput(event, "price")}
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
        {this.props.livres.newLivre ? this.montreLivre(this.props.livres.newLivre) : null }
      </div>
    );
  }
}


const mapStateToProps = (state, props) => ({

    livres: state.livres

});

export default connect(mapStateToProps,null)(AddLivre);
