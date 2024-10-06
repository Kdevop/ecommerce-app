import React, { useState, useEffect } from 'react';
import Styles from '../publicRoutes/productDetails.module.css';
import Footer from '../../components/footer/footer';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Paper } from '@mui/material';
import { singleProdReturned, getProductById } from '../../reduxStore/productSlice';
import { userAuthDone } from '../../reduxStore/authSlice';
import { addToCart, cartUpdate, cartData } from '../../reduxStore/cartSlice';


function ProductDetails() {
    const [loginMessage, setLogginMessage] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inCart, setInCart] = useState(false);

    const dispatch = useDispatch();
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

        if (isLoggedIn) {
            setInCart(false);

            console.log(cart);

            const cartCheck = cart.data;

            console.log(cartCheck);


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

    // if (cart.data.product_id && cart.data.product_id === product.product.id) {
    //     setInCart(true);
    // }

    if (product.length === 0) {
        return (
            <div className={Styles.loading}>
                <CircularProgress />
            </div>
        )
    };

    return (

        <Paper elevation={5} className={Styles.productcontainer}>
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
                        <p>This product is in your cart. If you want to buy more than one, you can do this in your cart.</p>
                    ) : (
                        <Button fullWidth type='submit' variant='contained' color='primary' className={Styles.button} onClick={onSubmit} >Buy this!</Button>
                    )}


                </div>
                {loginMessage ? (
                    <div>
                        <p>You need to be logged in to add to your cart.</p>
                        <p>Click here to <NavLink to='/register'>Register!</NavLink></p>
                        <p>Click here to <NavLink to='/login'>Sign In!</NavLink></p>
                    </div>
                ) : (
                    null
                )}
            </div>
        </Paper>

    );
};


export default ProductDetails;

