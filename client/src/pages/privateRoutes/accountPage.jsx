import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { authData, userAuthDone, userAuthLoading } from '../../reduxStore/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Styles from '../privateRoutes/accountPage.module.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { userData, userDetails, fetchingUser } from '../../reduxStore/userSlice';
import Loading from '../../components/loading/loading';
import NotLogin from '../../components/notLogin/notLogin';

function Account() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const loadingUser = useSelector(userAuthLoading);
    const isAuthenticated = useSelector(userAuthDone);
    const navigate = useNavigate();
    const user = useSelector(userData);
    const loading = useSelector(fetchingUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(true);
        }
        dispatch(userDetails());

    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        setTimeout(() => {
            if(!loadingUser && !loading) {
                setIsLoading(false);
            }
        }, 5000)
    });

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        )
        } else {
            return (
                <div>
                    {isLoggedIn ? (
                        <Paper className={Styles.account}>
                            <div className={Styles.headingCont}>
                                <h2 className={Styles.heading}>Hi {user.first_name} {user.last_name},</h2>
                            </div>
                            <div className={Styles.container}>
                                <a className={Styles.button} href='/userdetails'>User Details</a>
                                <a className={Styles.button} href='/orders'>Orders</a>
                            </div>

                        </Paper>
                    ) : (
                        <div>
                            <NotLogin />
                        </div>
                    )}

                </div>

            );
    }


};

export default Account;