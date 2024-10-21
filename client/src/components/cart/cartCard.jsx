import React, { useState } from 'react';
import Styles from '../cart/cartCard.module.css'
import { useDispatch } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { updateCart, deleteItem } from '../../reduxStore/cartSlice';

function CartCard(props) {
    const [drpdwn, setDrpdwn] = useState(false);
    const dispatch = useDispatch();

    const dropdown_content = {
        display: drpdwn ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'absolute',
        boxShaddow: '10px, 8px, 16px, 0px, rgba(0,0,0,0.2)',
        zindex: 1000,
        backgroundColor: '#E8E8E8'
    }

    const display = () => {
        setDrpdwn(!drpdwn);
    }

    const changeCart = async (quantity) => {
 
        if (quantity === 0) {

            const id = props.id;

            dispatch(deleteItem(id));

        } else {

            const details = {
                productId: props.id,
                quantity
            }

            dispatch(updateCart(details))

        }

        setDrpdwn(!drpdwn);

    }

    const price = parseFloat(props.price.replace('$', ''));
    const quantity = parseInt(props.quantity, 10); 
    
    const subPrice = price * quantity;

    return (
        <div className={Styles.cartcard_container}>
            <div className={Styles.name_container}>
                <h4>{props.name}</h4>
            </div>
            <div className={Styles.details_container}>
                <div>
                    <img src={`/photos/${props.url}.jpg`} alt={`Image of ${props.name}`} width={100} height={100} />
                </div>
                <div className={Styles.details_child}>
                    <div>
                        <p>Price: {props.price}</p>
                    </div>
                    <div>
                        <div className={Styles.dropdown}>
                            <button className={Styles.dropbtn} onClick={display}>Qty: {props.quantity}
                                <KeyboardArrowDownIcon />
                            </button>
                        </div>
                        <div style={dropdown_content} id="myDropdown">
                            <button onClick={() => changeCart(0)}>0 (delete)</button>
                            <button onClick={() => changeCart(1)}>1</button>
                            <button onClick={() => changeCart(2)}>2</button>
                            <button onClick={() => changeCart(3)}>3</button>
                        </div>
                    </div>
                </div>
            </div>
            <p>Sub total for this item: ${subPrice}.</p>
            <hr />
        </div>
    );
};

export default CartCard;


