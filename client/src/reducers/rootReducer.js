import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import livresReducer from './livresReducer.js'



const defaultReducer = () => {
  return  {nom: 'Benoit Lafrance', compagnie: 'Axe-Z', age: 40, skills: 'maximum'} 
}



const rootReducer = combineReducers({
 axe: defaultReducer,
 livres: livresReducer,
 user: userReducer
});

export default rootReducer;
