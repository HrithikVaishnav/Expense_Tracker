import React from 'react';
import {useHistory} from 'react-router-dom';

const Logout = () => {
    let history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('userId');
        history.push('/');
        window.location.reload(false);
    }
    return (
        <button
            type="button"
            className="btn"
            onClick={logoutHandler}
        >
        Logout
        </button>
    )
}

export default Logout;