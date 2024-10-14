import React from 'react';
import Styles from '../ordersCard/ordersCard.module.css';

function OrderCard(props) {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className={Styles.container}>
            <a className={Styles.button} href={`orders/${props.order}`}>
                <p>Order ID: {props.order}</p>
                <p>Order date: {formatDate(props.order_date)}</p>
                <p>Order status: {props.status}</p>
            </a>

        </div> 
    )
};

export default OrderCard;