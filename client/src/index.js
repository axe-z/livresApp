import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore.js';
import { Provider } from 'react-redux'

import Routes from './Routes.js'

const store = configureStore();  //=/ce qui configure le store
//console.log(store)

store.subscribe(() => {
 var state = store.getState();
 console.log('Nouveau state', state);
});

// console.log(store.getState()) // DEVRAIT DONNER {axe: Array(1)}

const App = () => {
    return(
       <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
