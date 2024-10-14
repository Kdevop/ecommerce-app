import React, { useState, useEffect } from 'react';
import styles from './accountMenu.module.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userAuthDone } from '../../reduxStore/authSlice';

function AccountMenu() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const isAuthenticated = useSelector(userAuthDone);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(true);  
        } else {
            setIsLoggedIn(false);
        }
    }, [isAuthenticated]);

    return (
        <div>
            {!isLoggedIn ? (
                <ul className={styles.register}>
                    <li ><NavLink className={styles.options} to='/register'>Register</NavLink></li>
                    <li ><NavLink className={styles.options} to='/login'>Login</NavLink></li>
                </ul>
            ) : (
                <ul className={styles.register}>
                    <li ><NavLink to='/account'>Account Details</NavLink></li>
                    <li ><NavLink to='/logout'>Logout</NavLink></li>
                </ul>
            )}
        </div>
    )
}

export default AccountMenu;