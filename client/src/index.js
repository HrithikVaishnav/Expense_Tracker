import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';


let token= JSON.parse(localStorage.getItem("jwt"))
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {     
  return request;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error.response);
    return Promise.reject(error.response);
});

ReactDOM.render(
  <React.StrictMode>
    <App token={token}/>
  </React.StrictMode>,
  document.getElementById('root')
);
