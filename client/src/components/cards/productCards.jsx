import React from 'react';
import Styles from '../cards/productCards.module.css';
import { NavLink } from 'react-router-dom';
import { Paper } from '@mui/material';


function ProductCard(props) {
    return (
        <Paper elevation={5}>
            <div className={Styles.productcontainer}>
                <div className={Styles.imagecontainer}>
                    <img src={`/photos/${props.imageName}.jpg`} alt={`Image of ${props.name}`} width={300} height={300} />
                </div>
                <div className={Styles.name}>
                    <h3>{props.name}</h3>
                </div>
                <div className={Styles.detailscontainer}>
                    <div className={Styles.moredeetsbtn}>
                        <NavLink to='/'> More Details</NavLink>
                    </div>
                    <div className={Styles.price}>
                        <h4>{`${props.price}`}</h4>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default ProductCard;

