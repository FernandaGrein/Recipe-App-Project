import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';

function App() {
  return (
    <RecipesProvider>
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/foods"
          // component={}
        />
        <Route
          exact
          path="/drinks"
          // component={}
        />
        <Route
          exact
          path="/foods/:id"
          // component={}
        />
        <Route
          exact
          path="/drinks/:id"
          // component={}
        />
        <Route
          exact
          path="/foods/:id/in-progress"
          // component={}
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          // component={}
        />
        <Route
          exact
          path="/profile"
          // component={}
        />
        <Route
          exact
          path="/done-recipes"
          // component={}
        />
        <Route
          exact
          path="/favorite-recipes"
          // component={}
        />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
