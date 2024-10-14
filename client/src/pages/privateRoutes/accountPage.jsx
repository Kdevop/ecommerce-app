import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import { authData, userAuthDone, userAuthLoading } from '../../reduxStore/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import Styles from '../privateRoutes/accountPage.module.css';
import { useNavigate, NavLink } from 'react-router-dom';
import { userData, userDetails } from '../../reduxStore/userSlice';
import Footer from '../../components/footer/footer';
import { CircularProgress } from '@mui/material';

function Account() {
    const [isLoading, setIsLoading] = useState(false);
    const loadingUser = useSelector(userAuthLoading);
    const isAuthenticated = useSelector(userAuthDone);
    const navigate = useNavigate();
    const user = useSelector(userData);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            //navigate('/login')
            if(loadingUser) {
                setIsLoading(true);
            }
        }

        dispatch(userDetails());

    }, [navigate, isAuthenticated, dispatch]);

    if (isLoading) {
        return (
            <div>
                <Paper>
                    <div>
                        <h3>Fetching Data</h3>
                    </div>
                    <div>
                        <CircularProgress/>
                    </div>
                </Paper>
            </div>
        )
    }

    return (
        <div>
            {isAuthenticated ? (
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

            <Footer />
        </div>

    );
};

export default Account;