import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import { takeEvery, put } from "@redux-saga/core/effects";
import axios from "axios";

// This saga will watch for actions
function* watcherSaga() {
  yield takeEvery("GET_GIFS", getGifs);
  yield takeEvery("ADD_FAVORITE", addFavorite);
  yield takeEvery("GET_FAVORITES", getFavorites);
  yield takeEvery("UPDATE_CATEGORY", updateCategory);
  yield takeEvery("DELETE_FAVORITE", deleteFavorite);
}

//TODO: sends axios.get to call the GIPHY API
function* getGifs(action) {
  console.log("action.payload is: ", action.payload);
  try {
    let response = yield axios.get(`/api/search/${action.payload}`);
    yield put({ type: "SET_GIFS", payload: response.data });
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

//TODO: POST: add gif to favorite page
function* addFavorite(action) {
  try {
    let response = yield axios.post('/api/favorite', { url: action.payload });
    console.log("POST from index file == ", response.data);
    yield put({ type: 'GET_FAVORITES' });
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

//TODO: GET all favorites from database
function* getFavorites() {
  try {
    let response = yield axios.get(`/api/favorite`);
    // console.log("in Favorites get", response.data);
    yield put({ type: "SET_FAVORITES", payload: response.data });
  } catch (error) {
    console.log("error with element get request", error);
    yield put({ type: "FETCH_ERROR", payload: error });
  }
}

//TODO: update favorite gif's catagory 
function* updateCategory(action) {
    try {
        yield axios.put(`/api/favorite/${action.payload.id}`, {
          category: action.payload.category,
        });
        yield put({ type: "GET_FAVORITES" });
      } catch (error) {
        console.log("error with category put request", error);
        yield put({ type: "FETCH_ERROR", payload: error });
      }
}

//TODO: DELETE favorite gif from database 
function* deleteFavorite(action) {
    try {
      yield axios.delete(`/api/favorite/${action.payload}`);
      yield put({ type: "GET_FAVORITES" });
    } catch (error) {
      console.log("error with delete request", error);
      yield put({ type: "FETCH_ERROR", payload: error });
    }
  }

// setGifs REDUCER
const setGifs = (state = [], action) => {
  if (action.type === "SET_GIFS") {
    return action.payload;
  }
  return state;
};

const setFavorites = (state = [], action) => {
  if (action.type === "SET_FAVORITES") {
    return action.payload;
  }
  return state;
};

const setCategory = (state = {}, action) => {
  if (action.type === "SET_CATEGORY") {
    return action.payload;
  }
  return state;
};

const sagaMiddleware = createSagaMiddleware();
const storeInstance = createStore(
  combineReducers({
    setGifs,
    setFavorites,
    setCategory,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(watcherSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>
);
