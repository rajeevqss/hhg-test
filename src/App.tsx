import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Employee from "./Employee";
import Counter from "./Counter";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route
        exact
        path="/"
        render={(props) => <Home {...props} />}
      />
      <Route
        exact
        path="/home"
        render={(props) => <Home {...props} />}
      />
      <Route
        exact
        path="/employee"
        render={(props) => <Employee {...props} />}
      />
      <Route
        exact
        path="/counter"
        render={(props) => <Counter {...props} />}
      />
      </Switch>
    </BrowserRouter>
  );
}


export default App;
