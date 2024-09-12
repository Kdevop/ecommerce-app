import React, {useState, useEffect} from 'react';
import Footer from '../../components/footer/footer';
import ProductCard from '../../components/cards/productCards';
import Styles from '../publicRoutes/home.module.css';
import { getProducts, productError, loadingProducts, productsReturned } from '../../reduxStore/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {CircularProgress } from '@mui/material';



function Home() {
    const dispatch = useDispatch();
    const location = useLocation();
    const products = useSelector(productsReturned);

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(getProducts());
        }
    }, [dispatch, location.pathname]);

    if (products.length === 0) {
        return (
            <div className={Styles.loading}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            <div className={Styles.home}>
                <div className={Styles.productcontainer}>
                    {products.map((product) => {
                        return (

                            
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                description={product.description}
                                category={product.category_id}
                                price={product.price}
                                imageName={product.image_url}
                                className={Styles.productCard}
                            />
                        )})
                    }
                </div>

            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default Home; 