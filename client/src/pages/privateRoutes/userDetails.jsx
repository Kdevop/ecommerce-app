import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import UserAccount from '../../components/userAccount/userAccount';
import Address from '../../components/address/address';
import Styles from '../privateRoutes/userDetails.module.css'
import ReplyIcon from '@mui/icons-material/Reply';
import { authData, userAuthDone } from '../../reduxStore/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { userDetails, userReturned, userDataReturned, userData, addressReturned, addressData, userError } from '../../reduxStore/userSlice';
import Footer from '../../components/footer/footer';

function UserDetails() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userAuthData = useSelector(authData);
    const isAuthenticated = useSelector(userAuthDone);
    const dataForAccount = useSelector(userData);
    const dataCheckAccount = useSelector(userDataReturned);
    const dataCheckAddress = useSelector(addressReturned);
    const dataforAddress = useSelector(addressData);
    const userErrorCheck = useSelector(userError);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated]);

    useEffect(() => { 
        if (isAuthenticated && location.pathname === '/userdetails') {
            dispatch(userDetails());
        }
    }, [dispatch, location.pathname, isAuthenticated]);

    return ( 
        <div>
            {isAuthenticated ? (
                <Paper className={Styles.container}>
                    <div className={Styles.topcontainer}>
                        <div>
                            <h2 className={Styles.heading}>Hi {dataForAccount.first_name} {dataForAccount.last_name},</h2>
                            <p>These are your details.</p>
                        </div>
                        <a href='/account'>Go back!<ReplyIcon /></a>
                    </div>
                    <div className={Styles.compcontainer}>
                        <Address
                            data={dataforAddress}
                            dataCheck={dataCheckAddress}
                            userError={userErrorCheck}
                        />
                        <UserAccount
                            data={dataForAccount}
                            datacheck={dataCheckAccount}
                            //userCheck={userReturned}
                            userError={userErrorCheck}
                        />
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

export default UserDetails;

// data={userData}
// datacheck={userDataReturned}
// userCheck={userReturned}
// userError={userError}
