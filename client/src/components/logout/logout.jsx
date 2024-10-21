//Imports of react methods
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

//Imports of components
import { logoutUser, userAuthDone } from '../../reduxStore/authSlice';


function Logout() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(userAuthDone);

    useEffect(() => {
        if (location.pathname === '/logout') {
            dispatch(logoutUser());

            if (!isAuthenticated) {
                navigate('/');
            }
        } 
    }, [dispatch, location.pathname, isAuthenticated, navigate]);


    return (

        <div>
            {isAuthenticated ? (
                <div>
                    <CircularProgress />
                </div>
            ) : (
                null
            )}
        </div>
    )
}

export default Logout;