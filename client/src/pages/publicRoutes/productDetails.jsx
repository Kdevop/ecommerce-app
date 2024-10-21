import React, { useState, useEffect } from 'react';
import Styles from '../publicRoutes/productDetails.module.css';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Paper } from '@mui/material';
import { singleProdReturned, getProductById } from '../../reduxStore/productSlice';
import { userAuthDone } from '../../reduxStore/authSlice';
import { addToCart, cartData } from '../../reduxStore/cartSlice';
import Loading from '../../components/loading/loading';


function ProductDetails() {
    const [loginMessage, setLogginMessage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inCart, setInCart] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const cart = useSelector(cartData);

    const { id } = useParams();
    const product = useSelector(singleProdReturned);
    const isAuthenticated = useSelector(userAuthDone);

    useEffect(() => {
        if (location.pathname === `/products/${id}`) {
            dispatch(getProductById(id));
        }
    }, [dispatch, location.pathname, id]);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [isAuthenticated, setIsLoggedIn]);


    useEffect(() => {

        if (isLoggedIn && cart) {
            setInCart(false);

            const cartCheck = cart.data;

            if (Array.isArray(cartCheck)) {
                const isProductInCart = cartCheck.some(cart => cart.product_id === product.id);

                console.log(isProductInCart);

                if (isProductInCart) {
                    setInCart(true);
                }
            }
        }
    }, [cart, product, isLoggedIn]);

    const onSubmit = async () => {
        if (!isLoggedIn) {
            setLogginMessage(true)
        }

        const productDetails = {
            product: product.id,
            quantity: 1,
            price: product.price,
            name: product.name,
            url: product.image_url,
        }

        const add = await dispatch(addToCart(productDetails));

        console.log(add);

    }

    const onCheckout = () => {
        navigate('/checkout')
    };


    if (product.length === 0) {
        return (
            <div>
                <Loading />
            </div>
        )
    };

    return (

        <Paper elevation={5} className={Styles.productcontainer}>
            <div className={Styles.container}>
                <div className={Styles.imagecontainer}>
                    <img src={`/photos/${product.image_url}.jpg`} alt={`Image of ${product.name}`} width={500} height={500} />
                </div>
                <div className={Styles.detailscontainer}>
                    <div className={Styles.name}>
                        <h3>{product.name}</h3>
                    </div>
                    <div className={Styles.description}>
                        <h4>{product.description}</h4>
                    </div>
                    <div className={Styles.price}>
                        <h4>{product.price}</h4>
                    </div>
                    <div className={Styles.cart}>

                        {inCart ? (
                            <Button fullWidth type='submit' variant='contained' color='primary' className={Styles.button} onClick={onCheckout} >Checkout</Button>
                        ) : (
                            <Button fullWidth type='submit' variant='contained' color='primary' className={Styles.button} onClick={onSubmit} >Add to cart</Button>
                        )}


                    </div>
                    {loginMessage ? (
                        <div>
                            <p>You need to be logged in to add to your cart.</p>
                            <p>You can Login or Register using the account menu at the top.</p>
                        </div>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </Paper>
    );
};


export default ProductDetails;

