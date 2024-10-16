import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import UserAccount from '../../components/userAccount/userAccount';
import Address from '../../components/address/address';
import Styles from '../privateRoutes/userDetails.module.css'
import ReplyIcon from '@mui/icons-material/Reply';
import { authData, userAuthDone, userAuthLoading } from '../../reduxStore/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { userDetails, userReturned, userDataReturned, userData, addressReturned, addressData, userError, fetchingUser } from '../../reduxStore/userSlice';
import Loading from '../../components/loading/loading';
import NotLogin from '../../components/notLogin/notLogin';

function UserDetails() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userAuthData = useSelector(authData); // from authSlice this is the data from the login - so the user from the seesion
    const isAuthenticated = useSelector(userAuthDone); //from authSlice this confirms that if the user is loged in.
    const dataForAccount = useSelector(userData); //this if from userSlice and is the data for the user - address and details.
    const dataCheckAccount = useSelector(userDataReturned); // from userSlice this is the confirmation is we have the user data back name email
    const dataCheckAddress = useSelector(addressReturned); // from the userSlice confirms if the user has an address recorded with us.
    const dataforAddress = useSelector(addressData); // from userSlice and is the address data.
    const userErrorCheck = useSelector(userError); // from userSlice and confirms if there was an error collecting userData.
    const loading = useSelector(fetchingUser); // from userSlice, this is confirms if we are waiting for user details.
    const loadingUser = useSelector(userAuthLoading); // from authSlice, confirms if we are waiting for userSession details.
    const dispatch = useDispatch();
    //const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(true);
        }
        dispatch(userDetails());

    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        setTimeout(() => {
            if (!loadingUser && !loading) {
                setIsLoading(false);
            }
        }, 5000)
    }, [loadingUser, loading]);

    // useEffect(() => {
    //     if (isAuthenticated && location.pathname === '/userdetails') {
    //         dispatch(userDetails());
    //     }
    // }, [dispatch, location.pathname, isAuthenticated]);

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
                    <Paper className={Styles.container}>
                        <div className={Styles.topcontainer}>
                            <div>
                                <h2 className={Styles.heading}>Hi {dataForAccount.first_name} {dataForAccount.last_name},</h2>
                                <p>Your Account.</p>
                            </div>
                            <a href='/account'>Go back!<ReplyIcon /></a>
                        </div>
                        <div className={Styles.compcontainer}>
                            <div className={Styles.griditem1}>
                                <UserAccount
                                    data={dataForAccount}
                                    datacheck={dataCheckAccount}
                                    //userCheck={userReturned}
                                    userError={userErrorCheck}
                                />
                            </div>
                            <div className={Styles.griditem2}>
                                <Address
                                    data={dataforAddress}
                                    dataCheck={dataCheckAddress}
                                    userError={userErrorCheck}
                                />
                            </div>
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

export default UserDetails;

