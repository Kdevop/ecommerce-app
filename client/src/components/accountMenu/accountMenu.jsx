import React, { useState, useEffect } from 'react';
import styles from './accountMenu.module.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userAuthDone } from '../../reduxStore/authSlice';

function AccountMenu(props) {
    const { onLogin, onReg } = props;

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
                <div className={styles.container}>
                    <button onClick={onReg}>Register</button>
                    <button onClick={onLogin}>Login</button>
                </div>
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