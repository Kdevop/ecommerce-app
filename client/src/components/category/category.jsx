import React from 'react';
import Styles from './category.module.css';
import { getProducts, getProductByCategory } from '../../reduxStore/productSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Category() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productCategory = async (category) => {
        if (category === 0) {
            dispatch(getProducts()); 
            navigate('/');
        } else {
            dispatch(getProductByCategory(category));
            navigate('/');
        }
    }

    return (
        <div >
            <ul>
                <button onClick={() => productCategory(1)}>T-shirt</button>
                <button onClick={() => productCategory(2)}>Shoes</button>
                <button onClick={() => productCategory(3)}>Suits</button>
                <button onClick={() => productCategory(0)}>All Products</button>
            </ul>
        </div>
    )
}

export default Category;