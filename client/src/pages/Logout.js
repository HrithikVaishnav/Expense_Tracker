import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  let history = useHistory();
  
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    history.push('/');
    window.location.reload(false);
  }

  return (
    <main>
      <section id="intro">
        <h1>Log out</h1>
        <p>
          <em>Thank you for visiting. See you next time.</em>
        </p>
        <button onClick={logout}>
          Logout
        </button>
      </section>
    </main>
  )
}

export default Logout;