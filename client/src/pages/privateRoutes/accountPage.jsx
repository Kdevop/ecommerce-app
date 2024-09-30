import React, { useEffect } from 'react';
import { Paper } from '@mui/material';
import { authData, userAuthDone } from '../../reduxStore/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Styles from '../privateRoutes/accountPage.module.css';
import { useNavigate, NavLink } from 'react-router-dom';

function Account() {
    const isAuthenticated = useSelector(userAuthDone);
    const navigate = useNavigate();
    const userData = useSelector(authData);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated]);

    return (
        <div>
            {isAuthenticated ? (
                        <Paper className={Styles.account}>
                        <div className={Styles.headingCont}>
                            <h2 className={Styles.heading}>Hi {userData.user.firstName} {userData.user.lastName}</h2>
                        </div>
                        <div className={Styles.container}>
                            <a className={Styles.button} href='/userdetails'>User Details</a>
                            <a className={Styles.button} href='/orders'>Orders</a>
                        </div>
                    </Paper>
            ) : (
                <Paper>
                <div>
                    <p>You need to be logged in to view this content.</p>
                    <p>You should be redirected, but if not, please lick the link below:</p>
                    <ul className={Styles.register}>
                        <li><NavLink to='/register'>Register</NavLink></li>
                        <li><NavLink to='/login'>Login</NavLink></li>
                    </ul>
                </div>
            </Paper>
            )}


        </div>

    );
};

export default Account;