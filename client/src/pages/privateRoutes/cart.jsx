import React, { useEffect, useState } from 'react';
import Styles from './cart.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { userAuthDone } from '../../reduxStore/authSlice';
import { cartData, cartReturned, cartUpdate, getCart, resetUpdateCart } from '../../reduxStore/cartSlice';
import { Button } from '@mui/material';
import CartCard from '../../components/cart/cartCard';

function Cart(props) {
    const { onLogin, onReg } = props;
    const [hasProd, setHasProd] = useState(false);
    const [checkingout, setCheckingout] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const loggedIn = useSelector(userAuthDone);
    const haveCart = useSelector(cartReturned);
    const update = useSelector(cartUpdate)
    const cart = useSelector(cartData);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

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

    const checkout = () => {
        navigate('/checkout')
    };

    useEffect(() => {
        if (location.pathname === '/checkout') {
            setCheckingout(true)
        } else {
            setCheckingout(false)
        }
    }, [location.pathname, setCheckingout]);

    if (!loggedIn) {
        return (
            <div className={Styles.container}>
                <button onClick={onReg}>Register</button>
                <button onClick={onLogin}>Login</button>
            </div>
        )
    }

    if (!hasProd) {
        return (
            <div>
                <p>You have yet to select some products.</p>
            </div>
        )
    }


    return (
        <div>

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

                {!checkingout ? (
                    <Button fullWidth type='submit' variant='contained' onClick={checkout} color='primary'>Checkout</Button>

                ) : (
                    null
                )}

            </div>

        </div>


    );
};

export default Cart;