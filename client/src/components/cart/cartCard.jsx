import React, { useEffect, useState } from 'react';
import Styles from '../cart/cartCard.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, CircularProgress, IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { productById } from '../../apis/apiRequest'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


function CartCard(props) {
    const [drpdwn, setDrpdwn] = useState(false);

    const dropdown_content = {
        display: drpdwn ? 'block' : 'none',
        position: 'absolute',
        boxShaddow: '10px, 8px, 16px, 0px, rgba(0,0,0,0.2)',
        zindex: 1000,
        backgroundColor: '#E8E8E8'
    }

    const display = () => {
        setDrpdwn(!drpdwn);
    }

    return (
        <div className={Styles.cartcard_container}>
            <div className={Styles.name_container}>
                <p>{props.name}</p>
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
                            <p href="#">0 (delete)</p>
                            <p href="#">1</p>
                            <p href="#">3</p>

                        </div>
                    </div>
                </div>
            </div>
            <p>This is for the sub total per item.</p>
        </div>
    );
};

export default CartCard;