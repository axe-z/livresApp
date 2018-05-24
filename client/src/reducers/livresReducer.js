
const livresReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_LIVRES':
      return { ...state, livresList: action.payload };
    case 'CLEAR_LIVRE_CRITIQUE':
      return {
        ...state,
        livre: action.payload.livre,
        critique: action.payload.critique
      };
    case 'GET_LIVRE_CRITIQUE':
      //console.log('red', action.payload)
      return {
        ...state,
        livre: action.payload.livre,
        critique: action.payload.critique
      };
    case 'CREER_UN_LIVRE':
      return { ...state, newLivre: action.payload };
    case 'CLEAR_NEW_LIVRE':
      return { ...state, newLivre: action.payload };
    case 'GET_EDIT_CRITIQUES':
      return { ...state, editLivre: action.payload };
    case 'UPDATE_CRITIQUES':
      return { ...state, updateLivre: action.payload.post, editLivre: action.payload.data  };  //le meme qu edit
    case 'DELETE_CRITIQUES':
      return { ...state, livreDeleter: action.payload }; //true
    case 'CLEAR_DELETE_CRITIQUES':
      return { ...state,
        livreDeleter: action.payload.livreDeleter ,
         updateLivre: action.payload.updateLivre,
         editLivre: action.payload.editLivre
        }; //vide donc pas true
    default:
      return state;
  }
};


export default livresReducer
