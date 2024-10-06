import React from 'react';
import Styles from '../ordersCard/ordersCard.module.css';

function OrderCard(props) {

    return (
        <div className={Styles.container}>
            <a className={Styles.button} href={`orders/${props.order}`}>
                <p>Order ID: {props.order}</p>
                <p>Order date: {props.order_date}</p>
                <p>Order status: {props.status}</p>
            </a>

        </div> 
    )
};

export default OrderCard;