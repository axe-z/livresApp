import axios from 'axios';

///call retourne un ARRAY
export const getBooks = (limit = 10, start = 0, order = 'asc' , livresList = '' ) => {

  const request = axios.get(`/api/livres?limit=${limit}&skip=${start}&order=${order}`)
                    .then(res =>  {
                      if(livresList){ //si y a un array d obj deja
                         console.log('livresList', livresList)
                          return [...livresList,...res.data]
                      } else {
                          return res.data
                      }

                  });
 //console.log(request)

  return  {
    type: 'GET_LIVRES',
    payload: request
  }
}




export const getLivreAvecCritique = id => {
  const request = axios.get(`/api/getLivre?id=${id}`);

  return (dispatch) => {
    request.then(res => {
      let livre = res.data;
      //console.log(livre); //obj livre est l unique livre retourné

      axios.get(`/api/getCritique?id=${livre.ownerId}`).then(res => {
        //console.log(res.data); //{prenom: "Dave", nom: "Buck"}
        //    return res.data
          let response = {
            livre: livre,
            critique: res.data
          }

          // console.log(response) //livre et critique
        dispatch({
          type: 'GET_LIVRE_CRITIQUE',
          payload: response
        });
      });
    });
  };
};


export const clearLivreCritique = () => {
  return {
    type: 'CLEAR_LIVRE_CRITIQUE',
    payload: {
      livre: {},
      critique: {}
    }
  }
}

/// Creation de livre /critique
export const addLivre = (livre) => {
const request = axios.post('/api/livre', livre )
.then(res => {
 //console.log(res.data)
 return res.data
})
  return {
    type: 'CREER_UN_LIVRE',
    payload: request
  }
}

//retire le lien apres creation
export const retireNewLivre = () => {
  return {
    type: 'CLEAR_NEW_LIVRE',
    payload: {}
  }
}


///userPost
export const getUserCritiques = (userId) => {
  const request = axios.get(`/api/users_critiques?user=${userId}`).then(res  => {
   //console.log(res.data)
   return res.data
  })

  return {
    type: 'GET_USER_CRITIQUES',
    payload: request
  }
}



//EDITLivre update et clear
export const getLivre = (id) => {
  const request = axios.get(`/api/getLivre?id=${id}`).then(res  => {
  // console.log(res.data)
   return res.data
  })

  return {
    type: 'GET_EDIT_CRITIQUES',
    payload: request
  }
}

//updateLivre

export const updateLivre = (formData) => {
   //console.log(  formData)
  const request = axios.post('/api/livre/update', formData).then(res  => {
  // console.log(res.data)
   return res.data
  })

  return {
    type: 'UPDATE_CRITIQUES',
    payload: request
  }
}


//deleteLivre /api/delete_livre
export const deleteLivre = (id) => {

  const request = axios.delete(`/api/delete_livre?id=${id}`).then(res  => {
   console.log(res.data) //true
   return res.data
  })

  return {
    type: 'DELETE_CRITIQUES',
    payload: request
  }
}

//enlever le delete
export const clearDeleteLivre = () => {

  return {
    type: 'CLEAR_DELETE_CRITIQUES',
    payload: {
      editLivre: {},
      updateLivre: false,
      livreDeleter: false
    }
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////
                                //USER
///////////////////////////////////////////////////////////////////////////////////////////////

// {
//     "email": "dave@gmail.com",
//     "password": "12227"
// }
// /api/user/login
export const loginUser = ({email, password}) => {

 const request = axios.post('/api/user/login', {email, password})
 .then(res => res.data )
 .catch(err =>  console.log(err) )



  return {
    type: 'USER_LOGIN',
    payload: request
  };
};


export const getUsers = () => {

 const request = axios.get('/api/users')
 .then(res => res.data )
  return {
    type: 'GET_USERS',
    payload: request
  };
};





///CREER NOUVEAU USER
export const creerUser = (user, listeActuelle) => {
  const request = axios.post('/api/enregistrement', user);

  return dispatch => {
    request.then(({ data }) => {
      //le user ici j regarde si ca fonctionne d ajouter le new user, sinon poiur eviter l err, la liste san le new qui est pas bon
      let users = data.success ? [...listeActuelle, data.user] : listeActuelle;

      let response = {
        success: data.success,
        users
      };
      dispatch({
        type: 'CREER_USER',
        payload: response
      })
    });

  };
};


//LOGOUT

// 
// export const logoutUser = user => {
//   const request = axios.post('/api/logout', user).then(res => {
//     console.log(res.data);
//     return res.data;
//   });
//
//   return {
//     type: 'LOGOUT_USER',
//     payload: request
//   };
// };
