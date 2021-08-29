import React, {useState} from 'react';
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
            Axios.post('/signin', {email, password})
                .then((response) => {
                    setLoading(true);
                    console.log(props);
                    props.userHandler(true, response.data.userId);
                    console.log(response);
                    localStorage.setItem('jwt', JSON.stringify(response.data.token));
                    localStorage.setItem('userid', JSON.stringify(response.data.userId));
                    history.push('/Catogory');
                    window.location.reload();
                }).catch(e => {
                   console.log(e);
                   if(e.data !== undefined)
                    setError(e.data.error);
                })
        }
        else{
            Axios.post('/signup', {email, password})
                .then(response => {
                    setLoading(true);
                    history.push('/')
                    console.log(response);
                    localStorage.setItem('jwt', JSON.stringify(response.data.token));
                }).catch(e => {
                   console.log(e);
                   if(e.data !== undefined)
                    setError(e.data.error);
                })
        }
    }

    return (
        <div className="container">
            <h1>
                {
                (isLogin)?'SignIn Page':'SignUp Page'
                }
            </h1>
            <div>
                <form onSubmit={mySubmitHandler} className="authform">
                    <div className="form-group">
                        <label name="email">Email</label>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            placeholder="Enter your email"
                            required
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label name="password">Password </label>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            placeholder="Enter your Password"
                            required="required"
                            onChange={e => setPassword(e.target.value)}
                        />
                        {error.length > 0 &&
                            <div className="error"> <span>{error}</span></div>}

                    </div>

                    <div className="form-group">
                        <div className="form-btn">
                            <button
                                type='submit'
                                className="btn"
                            >
                                {
                                    'Submit'
                                }
                            </button>

                            <button
                                type="button"
                                className="btn"
                                onClick={loginHandler}
                            >
                                {
                                    (isLogin)?'SignUp':'SignIn'
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default withRouter(Auth);