import React, { useState, useEffect } from 'react';
import Styles from './cancel.module.css';
import { useParams, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { checkoutUpdate } from '../../apis/apiRequest';
import { Paper } from '@mui/material';

function Cancel() {
    const location = useLocation();
    const navigate = useNavigate();

    const [update, setUpdate] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const { session_id } = useParams();

    useEffect(() => {
        if (location.pathname == `/cancel/${session_id}`) {

            const updateCheckout = async (session_id) => {
                try {
                    const response = await checkoutUpdate(session_id);
                    if (response.success) {
                        setUpdate(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            updateCheckout(session_id);
        };
    }, [location.pathname, session_id]);

    useEffect(() => {
        if (update) {
            const countdownTimer = setInterval(() => {
                setCountdown(prevCountdown => prevCountdown - 1);
                if (countdown === 0) {
                    clearInterval(countdownTimer);
                }
            }, 1000);

            const redirectTimer = setTimeout(() => {
                navigate('/');
            }, 5000);

            return () => {
                clearTimeout(countdownTimer);
                clearTimeout(redirectTimer);
            };
        }
    }, [update, navigate]);

    return (
        <div>
            <Paper elevation={5} className={Styles.container}>
                <div className={Styles.contentContainer}>
                    <div>
                        <h3>Payment Cancelled</h3>
                    </div>
                    <div>
                        <img src='/photos/logo2.jpg' alt='Image of Logo' />
                    </div>
                    {update ? (
                        <div>
                            <p>Should you still wish to buy these products, you will need to go to checkout again.</p>
                            <p>You will be redircted to the home page in {countdown}</p>
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </Paper>
        </div>
    )
}

export default Cancel; 