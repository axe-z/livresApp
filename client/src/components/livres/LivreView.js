import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getLivreAvecCritique, clearLivreCritique } from './../../actions/index.js'


class LivreView extends Component {

  componentWillMount = () => {
   this.props.getLivreAvecCritique(this.props.match.params.id)

  }
 componentWillUnmount = () => {
   this.props.clearLivreCritique()
 }


  renderLivre = (livres) =>  (
      livres.livre ?
      <div className="br_container">
        <div className="br_header">
          <h2>{livres.livre.name}</h2>
          <h5>{livres.livre.author}</h5>
          <div className='br_reviewer'>
              <span>Cririque par:</span> {livres.critique.prenom} {livres.critique.nom}
          </div>
        </div>
        <div className='br_review'>
          {livres.livre.review}
        </div>
        <div className='br_box'>
          <div className='left'>
            <div>
              <span>Pages:</span>   {livres.livre.pages}
            </div>
            <div>
              <span>Prix:</span>   {livres.livre.price}
            </div>
          </div>
          <div className='right'>
            <span>Étoiles:</span>

            <div>
                    {livres.livre.rating} / 5
            </div>
          </div>
        </div>
      </div> : null
  //   console.log(livres)
 )

  render() {
      let livres = this.props.livres
    return (
      <div>
          {this.renderLivre(livres)}
        </div>
    );
  }
}

const mapStateToProps = (state, props) => ({

    livres: state.livres

});



const mapDispatchToProps = (dispatch, props) => ({

    getLivreAvecCritique: (id) => dispatch(getLivreAvecCritique(id)),

    clearLivreCritique: () => dispatch(clearLivreCritique())
});

export default connect(mapStateToProps,mapDispatchToProps)(LivreView);
