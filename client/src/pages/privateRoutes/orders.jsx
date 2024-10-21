import React, { useEffect, useState } from 'react';
import Styles from '../privateRoutes/orders.module.css';
import { Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrders, orderData, prevOrders, loadingOrders } from '../../reduxStore/ordersSlice.js';
import { authData, userAuthDone, userAuthLoading } from '../../reduxStore/authSlice';
import OrderCard from '../../components/ordersCard/orderCard.jsx';
import ReplyIcon from '@mui/icons-material/Reply';
import Loading from '../../components/loading/loading';
import NotLogin from '../../components/notLogin/notLogin.jsx';

function Orders() {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isAuthenticated = useSelector(userAuthDone);
    const loadingUser = useSelector(userAuthLoading);
    const ordersLoading = useSelector(loadingOrders)
    const user = useSelector(authData);
    const orders = useSelector(orderData);
    const hasOrders = useSelector(prevOrders);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            if (!loadingUser && !ordersLoading) {
                setIsLoading(false);
            }
        }, 5000)
    });

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(true);
            const id = user.user.id;
            dispatch(getOrders(id));

        }
    }, [dispatch, user]);

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    if (!hasOrders && isLoggedIn) {
        return (
            <div className={Styles.orders}>
                <Paper>
                    <div className={Styles.container}>
                        <div>
                            <p>You do not have any previous orders.</p>
                        </div>
                        <div>
                            <a href='/account'>Go back!<ReplyIcon /></a>
                        </div>
                    </div>
                    <div className={Styles.btmContainer}>
                        <div>
                            <img src='/photos/logo2.jpg' alt='Image of Logo' />
                        </div>
                        <div>
                            <p>We look forward to you shopping with us!</p>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }

    return (
        <div className={Styles.orders}>
            {isLoggedIn ? (
                <Paper>
                    <div className={Styles.container}>
                        <div>
                            <h3>These are your orders</h3>
                        </div>
                        <div>
                            <a href='/account'>Go back!<ReplyIcon /></a>
                        </div>
                    </div>
                    <div className={Styles.ordersContainer}>
                        {orders.map((order) => {
                            return (
                                <OrderCard
                                    key={order.id}
                                    userId={order.user_id}
                                    order={order.id}
                                    order_date={order.order_date}
                                    status={order.order_status}
                                />
                            )
                        })}
                    </div>
                </Paper>
            ) : (
                <div>
                    <NotLogin />
                </div>
            )}
        </div>
    );
};

export default Orders;

