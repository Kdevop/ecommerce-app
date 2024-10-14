import React from 'react';
import Styles from '../orderDetailsProd/orderDetailsProd.module.css';

function ProdDetails(props) {
    return (
        <div>
        <div className={Styles.container}>
            <div>
                <img src={`/photos/${props.image}.jpg`} alt={`Image of ${props.name}`} width={200} height={200}/>
            </div>
            <div className={Styles.prodDetails}>
                <p className={Styles.title}>{props.name}</p>
                <p>Quantity: {props.quantity}</p>
                <p>Price: {props.price}</p>
            </div>

        </div>
        <hr/>
        </div>

    )
};

export default ProdDetails;