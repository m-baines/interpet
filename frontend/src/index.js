import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import loginReducer from './reducers/loginReducer'
import petReducer from './reducers/petReducer'
import notificationReducer from './reducers/notificationReducer'
import statsReducer from './reducers/statsReducer'
import showModalReducer from './reducers/showModalReducer'
import allPetsReducer from './reducers/allPetsReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  user: loginReducer,
  pet: petReducer,
  notify: notificationReducer,
  stats: statsReducer,
  showModal: showModalReducer,
  allPets: allPetsReducer

})

const store = createStore(reducer,
composeWithDevTools())


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
