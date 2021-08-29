import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import './auth.css';

const Auth = (props) => {

  let history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const loginHandler = () => {
    setLogin(!isLogin);
  }

  const mySubmitHandler = (event) => {
    console.log(email, password);
    event.preventDefault();
    if (isLogin) {
      Axios.post('/signin', { email, password })
        .then((response) => {
          setLoading(true);
          console.log(props);
          props.userHandler(true, response.data.userId);
          console.log(response);
          localStorage.setItem('jwt', JSON.stringify(response.data.token));
          localStorage.setItem('userid', JSON.stringify(response.data.userId));
          history.push('/');
          window.location.reload();
        }).catch(e => {
          console.log(e);
          if (e.data !== undefined)
            setError(e.data.error);
        })
    }
    else {
      Axios.post('/signup', { email, password })
        .then(response => {
          setLoading(true);
          history.push('/');
          console.log(response);
          
          props.userHandler(true, response.data.userId);
          console.log(response);
          localStorage.setItem('jwt', JSON.stringify(response.data.token));
          localStorage.setItem('userid', JSON.stringify(response.data.userId));
          window.location.reload();
        }).catch(e => {
          console.log(e);
          if (e.data !== undefined)
            setError(e.data.error);
        })
    }
  }

  return (
    <main>
      <section id="intro">
        <h1>{isLogin ? 'Login page' : 'Signup page'}</h1>
        <p>
          <em>{isLogin ? 'Login to' : 'Create'} your account to get access to all the services.</em>
        </p>

        <form onSubmit={mySubmitHandler}>
          <label name="email">Email</label>
          <input
            type='email'
            name='email'
            value={email}
            placeholder="Enter your email"
            required
            onChange={e => setEmail(e.target.value)}
          />

          <label name="password">Password</label>
          <input
            type='password'
            name='password'
            value={password}
            placeholder="Enter your Password"
            required="required"
            onChange={e => setPassword(e.target.value)}
          />
          {error.length > 0 &&
            <div className="mt-1"> <span className='error text-danger'>{error}</span></div>}

          {isLogin ?
            <p>Don't have an account?
              <span onClick={loginHandler} className="span-btn">
                Signup
              </span>
            </p> :
            <p>Already have an account?
              <span onClick={loginHandler} className="span-btn">
                Login
              </span>
            </p>
          }

          <button type='submit' disabled={isLoading}>
            {isLoading ?
              <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
              : 'Submit'
            }
          </button>

        </form>
      </section>
    </main>
  )

}
export default withRouter(Auth);