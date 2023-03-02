import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

import Header from '../Header/Header';
import Favorites from '../Favorites/Favorites';
import Search from '../Search/Search';

function App(props) {
  return (
    <Router>
    <div>
      <Header/>

      <Route path='/' exact>
        <Search />
      </Route>

      <Route path='/favorites' exact>
        <Favorites />
      </Route>
    </div>
    </Router>
  );
}

export default App;
