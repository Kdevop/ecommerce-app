import React, { useEffect, useState } from 'react';
import { Paper } from '@mui/material';
import Styles from './checkout.module.css';
import Cart from '../privateRoutes/cart';
import { userAuthDone } from '../../reduxStore/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { userDetails, addressData, addressReturned, userError } from '../../reduxStore/userSlice';
import { cartData } from '../../reduxStore/cartSlice';
import Address from '../../components/address/address';
import { Button } from '@mui/material';
import { dispatchCheckout } from '../../apis/apiRequest';

function Checkout() {
    const [open, setOpen] = useState(false)
    const isAuthenticated = useSelector(userAuthDone);
    const dataforAddress = useSelector(addressData);
    const dataCheckAddress = useSelector(addressReturned);
    const userErrorCheck = useSelector(userError);
    const cart = useSelector(cartData);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated && location.pathname === '/checkout') {
            dispatch(userDetails());
        }
    }, [dispatch, location.pathname, isAuthenticated]);

    const shippingAddress = () => {
        setOpen(!open);
    }

    const onSubmit = async () => {
        console.log('You hit the checkout button!');

        // you will need to amend for a different address for shiping
        const shippingAddress = false;
        const billingAddress = dataforAddress.id;
        const cartId = cart.data[0].id;


        const details = {
            shippingAddress: shippingAddress,
            billingAddress: billingAddress,
            cartId: cartId,
        };

        console.log(details);

        try {
            const checkingout = await dispatchCheckout(details);

            if(checkingout.success) {
               window.location.href = checkingout.url;
            }
        } catch (error) {
            console.log(error)
        }
}

    const openShipping = {
        display: open ? 'block' : 'none',
    }

    return (
        <div className={Styles.checkout}>
            <Paper>

                <div className={Styles.contentContainer}>
                    <div>
                        <h3>These are your products</h3>
                        <hr />
                        <Cart />
                    </div>
                    <div>
                        <h3>Your billing address</h3>
                        <Address
                            data={dataforAddress}
                            dataCheck={dataCheckAddress}
                            userError={userErrorCheck}
                        />
                        {/* <p>Deliver to a different address? <input type='checkbox' id='myCheck' onClick={shippingAddress}/></p>
                        <p id='text' style={openShipping}>TO be added.</p> */}
                    </div>
                </div>
                <div>
                    <Button fullWidth type='submit' variant='contained' onClick={onSubmit} color='primary'>Proceed to Payment</Button>
                </div>
            </Paper>

        </div>
    );
};

export default Checkout;