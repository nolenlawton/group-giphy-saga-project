import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import {createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from '@redux-saga/core';
import logger from 'redux-logger';
import { takeEvery,put } from '@redux-saga/core/effects';
import axios from 'axios';


// This saga will watch for actions
    function* watcherSaga () {
        yield takeEvery('GET_GIFS',getGifs)
        yield takeEvery('ADD_FAVORITES',addFavorite)
        yield takeEvery('GET_FAVORITES',getFavorites)
        yield takeEvery('UPDATE_CATEGORY',updateCategory)
    }

    function* getGifs (action) {
try {
    console.log('in get')
    let response = yield axios.get(`/api/search`)
    console.log(response.data)
    //put is the same as dispatch         
    yield put ({type: 'SET_GIFS', payload: response.data})
} catch (error) {
    console.log('error with element get request', error);
    yield put ({type:'FETCH_ERROR', payload: error})
}
    }

    function* addFavorite () {
        try {
            let response = yield axios.post('/api/favorite')
            console.log('in post',response.data)
            yield put ({type: 'SET_GIFS'})
  } catch (error) {
        console.log('error with element get request', error);
        yield put ({type:'FETCH_ERROR', payload: error})
  }
     }

     function* getFavorites () {
        try {
            
        } catch (error) {
         console.log('error with element get request', error);
        yield put ({type:'FETCH_ERROR', payload: error})
        }
            }
         

      function* updateCategory () {
        try {

                    
          } catch (error) {
        console.log('error with element get request', error);
        yield put ({type:'FETCH_ERROR', payload: error})
        }
            }
                


    // setGifs REDUCER
    const setGifs = (state =[],action) => {
        if(action.type === 'SET_GIFS') {
            return action.payload
        }
        return state;
    }

    const setFavorites = (state = [],action) => {
        if (action.type === 'SET_FAVORITES') {
            return action.payload
        }
        return state;
     }

    const setCategory = (state = {},action) => {
    if (action.type === 'SET_CATEGORY') {
        return action.payload;
    }
    return state;
    }



const sagaMiddleware = createSagaMiddleware ();
const storeInstance = createStore (
    combineReducers({
        setGifs,
        setFavorites,
        setCategory
    }),
applyMiddleware(sagaMiddleware,logger)
)

sagaMiddleware.run(watcherSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);