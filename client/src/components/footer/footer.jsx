import React from 'react';
import Styles from '../footer/footer.module.css';
import { Paper } from '@mui/material';

function Footer() {
    return (
        <div className={Styles.container}>
            <div className={Styles.footer}>
                <div className={Styles.detailscontainer}>
                    <div className={Styles.listcontainer}>
                        <p className={Styles.title}>Company Links</p>
                        <ul classNames={Styles.lists}>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>UK Modern Slavery Act</li>
                            <li>Sustainability</li>
                        </ul>
                    </div>
                    <div className={Styles.listcontainer}>
                        <p className={Styles.title}>Info for Customer</p>
                        <ul classNames={Styles.lists}>
                            <li>Terms and Conditions</li>
                            <li>Returns</li>
                            <li>Delivery</li>
                            <li>Customer Service</li>
                        </ul>
                    </div>
                </div>
                <div className={Styles.emailcontainer}>
                    <button>Sign up for offers</button>
                    <form>
                        <input type='text' placeholder='Enter your email here' name='email' />
                    </form>
                </div> 
            </div>
            <hr />
            <div className={Styles.copyrightcontainer}>
                <p>Made by Kiernan Hall / Icons from MUI / Logo from looka.com / All images from Royalty Free sites / Checkout out my Portfolio site - link comming soon!</p>
            </div>
        </div>
    );
};

export default Footer; 