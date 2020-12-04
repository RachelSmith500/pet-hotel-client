import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { put, takeLatest } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import axios from 'axios';




const ownerReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OWNERS':
      return action.payload
    default:
      return state;
  }
};

const petReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PETS':
      return action.payload
    default:
      return state;
  }
};

function* fetchPets() {
  try {
    const response = yield axios.get('/pets')
    console.log(response.data);

    yield put({ type: 'SET_PETS', payload: response.data});
  } catch (err) {
    console.log('Error in fetchPets saga');
    
  }
}
function* addPet(action) {
  console.log(action.payload);
  try {
    yield axios.post('/pets', action.payload);

    yield put({ type: 'FETCH_PETS'});
  } catch (err) {
    console.log('Error in addPet saga', err);
    
  }
}

function* fetchOwners() {
  try {
    //gets owners
    let response = yield axios.get('/owner');
    //sets the reducer
    yield put({ type: 'SET_OWNERS', payload: response.data });

} catch(error){
  console.log('error in getting owners', error);
}};

function* addOwner(action) {
  try {
    //posts new owner
    console.log(action.payload)
    yield axios.post('/owner', action.payload);
    //requests the owners again
    yield put({ type: 'FETCH_PET_OWNER' })

} catch(error){
  console.log('error in posting owner', error);
}};

function* watcherSaga(){
  yield takeLatest('FETCH_PETS', fetchPets);
  yield takeLatest('ADD_PET', addPet);
  yield takeLatest('FETCH_PET_OWNER', fetchOwners);
  yield takeLatest('ADD_OWNER', addOwner);
  
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    petReducer,
    ownerReducer
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
