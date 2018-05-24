import * as redux from 'redux'
import { applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers/rootReducer';
// SI ON VEUT THUNK
 import thunk from 'redux-thunk'
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// SI ON VEUT PROMISE
import promiseMiddleware from 'redux-promise';


 //!! enlever REDUX_DEVTOOLS_EXTENSION a la fin ca fonctionne juste dans CHROME
 const configureStore = () => {
    return redux.createStore(rootReducer, compose(
     applyMiddleware(promiseMiddleware, thunk  /*reduxImmutableStateInvariant()*/),  ///ajouter dans les ( les diff. middleware)
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  //pourdevtool
    ))};


export default configureStore
