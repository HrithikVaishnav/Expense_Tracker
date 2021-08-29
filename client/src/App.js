import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Auth from './pages/Auth/Auth';
import Category from './pages/Category/Category';
import Navbar from "./components/Navbar/Navbar";
import Logout from "./pages/Logout";

function App() {

    const [isauth, setIsauth] = useState(false);
    const [userId, setuserId] = useState('');

    const userHandler = (userid) => {
      if(!isauth)
        setIsauth('');
      else 
        setIsauth(userid);
    }

    const authHandlerLogin = () => {
      setIsauth(true);
    }

    const authHandlerLogout = () => {
      setIsauth(false);
    }

    return (
      <div className="App">
        <Router>
          <div>
            <Navbar isauth={isauth}/>
          </div>
          {
            (isauth)
            ?
            <>
              <Switch>
                <Route exact path="/" component={Auth} />
                <Route exact path="/Logout" component={Logout} />
              </Switch>
            </>
            :
            <>
              <Switch>
                <Route exact path="/" component={Auth} />
                <Route exact path="/Category" component={Category} />
              </Switch>
            </>
          }
        </Router>
      </div>
    );
}

export default App;
