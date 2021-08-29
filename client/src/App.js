import React, { useState } from 'react';
import './App.css';
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home'
import Category from './pages/Category/Category';
import Navbar from "./components/Navbar/Navbar";
import Logout from "./pages/Logout";
import Expense from './pages/Expense/Expense';

const App = (props) => {

  const [userId, setuserId] = useState('');

  const userHandler = (auth, userid) => {
    console.log(userid);
    if (!auth)
      setuserId('');
    else
      setuserId(userid);

    console.log(userId);
  }

  return (
    <Router history={history}>
      <Navbar
        token={props.token}
        userHandler={userHandler}
      />
      {props.token != null ?
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact path="/Category"
            component={() =>
              <Category
                userId={userId}
                userHandler={userHandler}
              />
            }
          />
          <Route exact path="/Logout" component={Logout} />
        </Switch>
        :
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact path="/auth"
            component={() => <Auth userHandler={userHandler} />}
          />
          <Route
            exact path="/Category"
            component={() =>
              <Category
                userId={userId}
                userHandler={userHandler}
              />
            }
          />
          <Route
            exact path="/Category/:id"
            component={() =>
              <Expense
                userId={userId}
                userHandler={userHandler}
              />
            }
          />
        </Switch>
      }
    </Router>
  );
}

export default App;
