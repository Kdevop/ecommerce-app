import React from 'react';
import Styles from '../orderDetailsProd/orderDetailsProd.module.css';

function ProdDetails(props) {
    return (
        <div>
            <hr/>
            <div>This is the prod details for orders</div>
            <p>This is the product ID: {props.prodId}</p>
            <p>This is the quantity: {props.quantity}</p>
            <p>This is the price: {props.price}</p>
            <p>This is the name: {props.name}</p>
            <p>This is the image details: {props.image}</p>
            <hr/>
        </div>

    )
};

export default ProdDetails;