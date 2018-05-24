import React, { Component } from 'react';
import { connect } from 'react-redux';
 import { bindActionCreators } from 'redux'
import LivreItem from './WidgetUi/LivreItem.js'
import { getBooks } from '../actions/index.js'

class HomeContainer extends Component {

//?limit=${limit}&skip=${start}&order=${order}
componentWillMount = () => {
  //this.props.dispatch(getBooks(1,0,'desc'))
 this.props.getBooks( 4, 0, 'desc')       //va mettre un seul livre dans le store
}

renderItems = livres => (

    livres.livresList ?
    livres.livresList.map(item => <LivreItem key={item._id} {...item} />) : null

)

loadmore = () => {

    let count = this.props.livres.livresList.length;
     console.log('state',  this.props.livres)

   this.props.getBooks( 1, count, 'desc', this.props.livres.livresList)
  //dans le dernier argument on relance l array qu on a actuellement a l action.

}



  render() {


    return (
      <div>

        {this.renderItems(this.props.livres)}
        <div className="loadmore"
                onClick={this.loadmore}
                >Plus De Livres
              </div>
      </div>
    );
  }
}



const mapStateToProps = (state, props) => ({
   axe: state.axe,
   livres: state.livres, //on a mis dans le reducer
   user: state.user
})

function mapDispatchToProps(dispatch){
  return  bindActionCreators({  //demande un import
    getBooks
  }, dispatch) //dispatch en 2ieme arg
}



export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer);
