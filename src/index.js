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

    }

    // setGifts REDUCER
    const setGifts = (state =[],action) => {
        if(action.type === 'SET_GIFTS') {
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
        setGifts,
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