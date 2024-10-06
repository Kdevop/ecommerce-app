import React, { useEffect } from 'react';
import Styles from '../privateRoutes/orderDetails.module.css';
import Footer from '../../components/footer/footer';
import { Paper } from '@mui/material';
import { useParams, useLocation, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthDone } from '../../reduxStore/authSlice';
import ReplyIcon from '@mui/icons-material/Reply';
import { orderDetails, orderDetailsCheckout, orderDetailsProducts } from '../../reduxStore/ordersSlice';
import ProdDetails from '../../components/orderDetailsProd/orderDetailsProd';

function OrderDetails() {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const { orderId } = useParams();
    const isAuthenticated = useSelector(userAuthDone);
    const checkout = useSelector(orderDetailsCheckout);
    const products = useSelector(orderDetailsProducts);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [navigate, isAuthenticated]);

    useEffect(() => {
        console.log('Dispatching orderDetails for id:', orderId);
        if (location.pathname === `/orders/${orderId}`) {
            dispatch(orderDetails(orderId));
        }
    }, [dispatch, location.pathname, orderId]);

    if (!isAuthenticated) {
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

    return (
        <div className={Styles.orderDetails}>
            <Paper>
                <div className={Styles.headingContainer}>
                    <div >
                        <p>This is the order details page</p>
                    </div>
                    <div>
                        <a href='/orders'>Go back!<ReplyIcon /></a>
                    </div>
                </div>
                <div className={Styles.container}>
                    <div>
                        <p>This is the product side</p>
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
                        <p>This is the checkout side</p>
                        <p>This is the order ID: {checkout.id}</p>
                        <p>This is the order date: {checkout.order_date}</p>
                        <p>This is the order status: {checkout.order_status}</p>
                        <p>This is the payment method: {checkout.payment_method}</p>
                        <p>This is the total cost: {checkout.total_amount}</p>
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
            <Footer />
        </div>

    );
};

export default OrderDetails;