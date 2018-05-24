///////////////////////////////////////////////////////////////////////////////////////////////
import axios from 'axios';

export function auth (payload) {

  const request = axios.get('/api/auth')
  .then(res => {
    return res.data
  })

    return {
        type: 'USER_AUTH',
        payload: request
    }
}
