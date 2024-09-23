import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userAuthDone } from '../../reduxStore/authSlice';
import { cartData, cartReturned, cartError, cartUpdate, getCart, resetUpdateCart } from '../../reduxStore/cartSlice';
import { Button, CircularProgress } from '@mui/material';
import CartCard from '../../components/cart/cartCard';
import { productById } from '../../apis/apiRequest';

function Cart() {
    const [hasProd, setHasProd] = useState(false);
    const dispatch = useDispatch();
    const loggedIn = useSelector(userAuthDone);
    const haveCart = useSelector(cartReturned);
    const update = useSelector(cartUpdate)
    const cart = useSelector(cartData);

    useEffect(() => {
        if (haveCart) {

            if (!cart.hasProd) { 
                setHasProd(false);
            }

            if (cart.hasProd) {
                setHasProd(true);
            }
        }
    }, [haveCart, cart])

    useEffect(() => {
        if (update) {
            dispatch(getCart());

            dispatch(resetUpdateCart());
        }
    }, [update, dispatch, getCart, resetUpdateCart]);

    const runningTotal = () => {

        let totalPrice = 0;

        for (let item of cart.data) {
            totalPrice += item.quantity * parseFloat(item.product_price.replace('$', ''));
        }

        return totalPrice.toFixed(2);
    }

    
    if (!loggedIn) {
        return (
            <div>
                <p>You need to be logged in to view your cart</p>
                <p>Click here to <NavLink to='/register'>Register!</NavLink></p>
                <p>Click here to <NavLink to='/login'>Sign In!</NavLink></p>
            </div>
        )
    } 

    return (
        <div>
            {hasProd ? (
                <div>
                    {cart.data.map((cartItem) => (
                        <CartCard
                            key={cartItem.product_id}
                            id={cartItem.product_id}
                            quantity={cartItem.quantity}
                            price={cartItem.product_price}
                            name={cartItem.product_name}
                            url={cartItem.product_url}

                        />
                    ))}

                    <p>Current total: ${runningTotal()}</p>

                    <Button fullWidth type='submit' variant='contained' color='primary'>Checkout</Button>

                </div>
            ) : (
                <div>
                    <p>You are logged in but have no products.</p>

                </div>
            )}
        </div>


    );
};

export default Cart;