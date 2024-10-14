import React, { useEffect, useState } from 'react';
import Styles from '../privateRoutes/orders.module.css';
import { Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { getOrders, orderData, prevOrders } from '../../reduxStore/ordersSlice.js';
import { authData, userAuthDone, userAuthLoading } from '../../reduxStore/authSlice';
import OrderCard from '../../components/ordersCard/orderCard.jsx';
import ReplyIcon from '@mui/icons-material/Reply';
import Footer from '../../components/footer/footer.jsx';
import { CircularProgress } from '@mui/material';

function Orders() {
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated = useSelector(userAuthDone);
    const loadingUser = useSelector(userAuthLoading);
    const user = useSelector(authData);
    const orders = useSelector(orderData);
    const hasOrders = useSelector(prevOrders);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         navigate('/login')
    //     }
    // }, [navigate, isAuthenticated]);

    // useEffect(() => {
    //     if (isAuthenticated && location.pathname === '/orders' && user && user.user && user.user.id) {

    //         const id = user.user.id;

    //         dispatch(getOrders(id));
    //     }
    // }, [dispatch, navigate, location.pathname, isAuthenticated, user, user.user, user.user.id]);

    useEffect(() => {
        console.log(isAuthenticated);

        
            if (!isAuthenticated) {
                if (loadingUser) {
                    setIsLoading(true);
                }
                //navigate('/login');
                console.log('Why oh why', isAuthenticated);
            } else {
                try {
                    const id = user.user.id;
                    dispatch(getOrders(id));
                } catch (error) {
                    //navigate('/login');
                    console.log(error);
                }
            }
      


    }, [dispatch, navigate, user]);

    if (!hasOrders && isAuthenticated) {
        return (
            <div className={Styles.orders}>
                <Paper>
                    <div className={Styles.container}>
                        <div>
                            <p>You do not have any previous orders</p>
                        </div>
                        <div>
                            <a href='/account'>Go back!<ReplyIcon /></a>
                        </div>
                    </div>
                    <Footer />
                </Paper>
            </div>
        )
    }

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
        <div className={Styles.orders}>
            {isAuthenticated ? (
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

export default Orders;


// setTimeout(() => {
//     if (!isAuthenticated) {
//         if (loadingUser) {
//             setIsLoading(true);
//         }
//         //navigate('/login');
//         console.log('Why oh why', isAuthenticated);
//     } else {
//         try {
//             const id = user.user.id;
//             dispatch(getOrders(id));
//         } catch (error) {
//             //navigate('/login');
//             console.log(error);
//         }
//     }
// }, 60000)