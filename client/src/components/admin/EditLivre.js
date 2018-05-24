import React, { PureComponent } from 'react';
import { getLivre, updateLivre, deleteLivre, clearDeleteLivre  } from './../../actions/index.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class EditLivre extends PureComponent {
  state = {
    formData :{
      _id: this.props.match.params.id,
      name: '',
      author: '',
      review: '',
      pages: '',
      rating: '',
      price: ''
    }
  };
componentWillMount = () => {
//1 va chercher le livre avec id
  this.props.dispatch(getLivre(this.state.formData._id))

}


  submitForm = e => {
    e.preventDefault();
    let data = {...this.state.formData }
  //  console.log(data)
   this.props.dispatch(updateLivre( data ))
  };

  handleInput = (event, nom) => {
  //  event.persist();
   let newState = { ...this.state.formData };
   newState[nom] = event.target.value;
  this.setState(() => ({formData:  newState }))
  };

  deleteCritique = () => {
    this.props.dispatch(deleteLivre(this.state.formData._id))
  }
  redirectUser = () => {
    setTimeout(() => {
    //  this.props.dispatch(clearDeleteLivre())
      this.props.history.push('/user/userCritiques')
    },1500)

  }

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
    this.props.dispatch(clearDeleteLivre())
  }

componentWillReceiveProps = nextProps => {
  //2 met les info dans la form
  let livre = nextProps.livres.editLivre;
  // console.log(nextProps.livres )
  this.setState(() => ({
    formData: {
      _id: livre._id,
      name: livre.name,
      author: livre.author,
      review: livre.review,
      pages: livre.pages,
      rating: livre.rating,
      price: livre.price
    }
  }));
};


  render() {
    let livres = this.props.livres;

    return (

      <div className="rl_container article">
        {
            livres.updateLivre ?
                <div className="edit_confirm">
                    {livres.editLivre.name} mise-à-jour ,
                      <Link style={{paddingLeft: '10px'}} to={`/livres/${livres.editLivre._id}`}>
                         Cliquer ici pour vous rendre à sa fiche
                    </Link>
                </div>
            :null
        }
        {
            livres.livreDeleter ?
                <div className="red_tag">
                    Livre et Critique supprimé
                     {this.redirectUser()}
                </div>
            :null
        }

        <form onSubmit={this.submitForm}>
          <h2>Modifier une critique</h2>
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
          <button type="submit">Modifier</button>
           <div className="delete_post">
              <div className="button" onClick={this.deleteCritique}>Supprimer</div>
           </div>
        </form>
        { this.props.livres.newLivre ? this.montreLivre(this.props.livres.newLivre) : null }
      </div>
    );
  }
}


const mapStateToProps = (state, props) => ({

    livres: state.livres

});

export default connect(mapStateToProps,null)(EditLivre);
