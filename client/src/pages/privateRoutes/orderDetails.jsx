import React, { useEffect, useState } from 'react';
import Styles from '../privateRoutes/orderDetails.module.css';
import { Paper } from '@mui/material';
import { useParams, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthDone, userAuthLoading } from '../../reduxStore/authSlice';
import ReplyIcon from '@mui/icons-material/Reply';
import { orderDetails, orderDetailsCheckout, orderDetailsProducts } from '../../reduxStore/ordersSlice';
import ProdDetails from '../../components/orderDetailsProd/orderDetailsProd';
import { CircularProgress } from '@mui/material';

function OrderDetails() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { orderId } = useParams();
    const isAuthenticated = useSelector(userAuthDone);
    const checkout = useSelector(orderDetailsCheckout);
    const products = useSelector(orderDetailsProducts);
    const loadingUser = useSelector(userAuthLoading);

    useEffect(() => {
        if (!isAuthenticated) {

            if(loadingUser) {
                setIsLoading(true);
            }
        }

    }, [navigate, isAuthenticated, dispatch]);

    useEffect(() => {
        if (location.pathname === `/orders/${orderId}`) {
            dispatch(orderDetails(orderId));
        }
    }, [dispatch, location.pathname, orderId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    if (!isAuthenticated && !isLoading) {
        return (
            <div className={Styles.orderDetails}>
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
            </div>
        )
    }

    if(!isAuthenticated && isLoading) {
        return (
            (
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
        )
    }

    return (
        <div className={Styles.orderDetails}>
            <Paper>
                <div className={Styles.headingContainer}>
                    <div >
                        <h3>These are your order details.</h3>
                    </div>
                    <div>
                        <a href='/orders'>Go back!<ReplyIcon /></a>
                    </div>
                </div>
                <div className={Styles.container}>
                    <div>
                        <h4>Products Ordered</h4>
                        <hr/>
                        {products.map((product) => {
                            return (
                                <ProdDetails
                                    key={product.product_id}
                                    prodId={product.product_id}
                                    quantity={product.quantity}
                                    price={product.product_price}
                                    name={product.product_name}
                                    image={product.product_url}
                                />
                            )
                        })}
                    </div>
                    <div>
                        <h4>Checkout Details</h4>
                        <hr/>
                        <p>Order ID: {checkout.id}</p>
                        <p>Order date: {formatDate(checkout.order_date)}</p>
                        <p>Order status: {checkout.order_status}</p>
                        <p>Payment method: {checkout.payment_method}</p>
                        <p>Total cost: {checkout.total_amount}</p>
                        <hr />
                        <p>This is the shipping address!</p>
                        <p>{checkout.address_line1}</p>
                        <p>{checkout.address_line2}</p>
                        <p>{checkout.city}</p>
                        <p>{checkout.county}</p>
                        <p>{checkout.post_code}</p>

                    </div>
                </div>

            </Paper>

        </div>

    );
};

export default OrderDetails;