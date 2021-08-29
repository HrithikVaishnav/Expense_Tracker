import React, { useState } from 'react';
import './App.css';
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import Auth from './pages/Auth/Auth';
import Category from './pages/Category/Category';
import Navbar from "./components/Navbar/Navbar";
import Logout from "./pages/Logout";

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
    <div className="App">
      <Router history={history}>
        <div>
          <Navbar
            token={props.token}
            userHandler={userHandler}
          />
        </div>
        {
          (props.token != null)
            ?
            <>
              <Switch>
                <Route
                  exact path="/Category"
                  component={() => <Category
                    userId={userId}
                    userHandler={userHandler}
                  />
                  }
                />
                <Route exact path="/Logout" component={Logout} />
              </Switch>
            </>
            :
            <>
              <Switch>
                <Route
                  exact path="/"
                  component={() => <Auth
                    userHandler={userHandler}
                  />
                  }
                />
                <Route
                  exact path="/Category"
                  component={() => <Category
                    userId={userId}
                    userHandler={userHandler}
                  />
                  }
                />
              </Switch>
            </>
        }
      </Router>
    </div>
  );
}

export default App;
