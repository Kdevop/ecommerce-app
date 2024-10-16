import React from 'react';
import Styles from '../cards/productCards.module.css';
import { NavLink } from 'react-router-dom';
import { Paper } from '@mui/material';


function ProductCard(props) {
    return (
        <Paper elevation={5}>
            <a href={`/products/${props.id}`} className={Styles.container}>
                <div className={Styles.productcontainer}>
                    <div className={Styles.imagecontainer}>
                        <img src={`/photos/${props.imageName}.jpg`} alt={`Image of ${props.name}`} width={300} height={300} />
                    </div>

                    <div className={Styles.detailscontainer}>
                        <h3 className={Styles.words}>{props.name}</h3>
                        <h4 className={Styles.words}>{`${props.price}`}</h4>
                    </div>
                </div>
            </a>
        </Paper>
    );
};

export default ProductCard;

