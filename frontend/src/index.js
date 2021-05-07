// Import react
import React from 'react';
import ReactDOM from 'react-dom';

// Import redux
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// Import reducers
import loginReducer from './reducers/loginReducer'
import petReducer from './reducers/petReducer'
import notificationReducer from './reducers/notificationReducer'
import statsReducer from './reducers/statsReducer'
import showModalReducer from './reducers/showModalReducer'
import allPetsReducer from './reducers/allPetsReducer'

// Import app and styling
import './index.css';
import App from './App';

// Import report web vitals
import reportWebVitals from './reportWebVitals';

// Combine reducers
const reducer = combineReducers({
  user: loginReducer,
  pet: petReducer,
  notify: notificationReducer,
  stats: statsReducer,
  showModal: showModalReducer,
  allPets: allPetsReducer
})

// Create redux store
const store = createStore(reducer,
composeWithDevTools())

// Render App in React DOM and provide redux store
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
