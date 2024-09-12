import React, { useState, useEffect } from 'react';
import Styles from '../publicRoutes/productDetails.module.css';
import Footer from '../../components/footer/footer';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { singleProdReturned, getProductById } from '../../reduxStore/productSlice';
import { Paper } from '@mui/material';

function ProductDetails() {
    const dispatch = useDispatch();
    const location = useLocation();

    const { id } = useParams();
    const product = useSelector(singleProdReturned);

    useEffect(() => {
        if (location.pathname === `/products/${id}`) {
            dispatch(getProductById(id));

        }

    }, [dispatch, location.pathname]);

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
                    <p>some stuff to come here on adding to cart.</p>
                </div>
            </div>
        </Paper>

    );
};


export default ProductDetails;

{/* <div>
                <p>This is the Product Details page.</p>
                <p>The product ID for this page is: {id}</p>

                <p>This is the name: {product.name} </p>
                <p>This is the description: {product.description} </p>
                <p>This is the category: {product.category_id} </p>
                <p>This is the image: {product.image_url} </p>
                <p>This is the price: {product.price} </p>

            </div> */}