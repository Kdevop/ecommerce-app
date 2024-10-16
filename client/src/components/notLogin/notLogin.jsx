import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Styles from './notLogin.module.css'
import { Paper } from '@mui/material';

function NotLogin() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);
    
    useEffect(() => {
        const countdownTimer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
            if (countdown === 0) {
                clearInterval(countdownTimer);
            }
        }, 1000);

        const redirectTimer = setTimeout(() => {
            navigate('/login');
        }, 5000);

        return () => {
            clearTimeout(countdownTimer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);


    return (
        <div >
            <Paper >
                <div className={Styles.topcontainer}>
                    <h3>Are you signed into Your Account?</h3>
                    <p>You should be redirected in {countdown}.</p>
                    <div>
                        <img src='./photos/logo2.jpg' alt='Image of Logo' />
                    </div>
                    <div>
                        <p>If you are not redirected, you can use the links below:</p>
                        <ul className={Styles.register}>
                            <li><NavLink to='/register'>Register</NavLink></li>
                            <li><NavLink to='/login'>Login</NavLink></li>
                        </ul>
                    </div>
                </div>
            </Paper>
        </div>
    )
};

export default NotLogin;