import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000/';

let userData =  JSON.parse(localStorage.getItem("userData"))
let token
if(userData){
    token= userData.token
}
    
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
    return Promise.reject(error);
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
