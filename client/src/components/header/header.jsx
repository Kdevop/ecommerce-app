// dependency imports
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

// styles, images and logos imports
import styles from '../header/header.module.css';
import logo from '../../assets/logo2.jpg';
import logo_name from '../../assets/logo_name.jpg';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// compoenent imports
import SearchBar from '../search/search';
import Cart from '../../pages/privateRoutes/cart';
import { userAuthDone } from '../../reduxStore/authSlice';
import { getProducts, getProductByCategory } from '../../reduxStore/productSlice';

function Header() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isOpenCat, setIsOpenCat] = useState(false);
    const [isOpenAcc, setIsOpenAcc] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const isAuthenticated = useSelector(userAuthDone);
    
    const displayMenu = () => {
        if (isOpenAcc) {
            setIsOpenAcc(!isOpenAcc)
        };
        if (isOpenCart) {
            setIsOpenCart(!isOpenCart)
        };
        setIsOpenCat(!isOpenCat)
    };

    const displayAccount = () => {
        if (isOpenCat) {
            setIsOpenCat(!isOpenCat)
        };
        if (isOpenCart) {
            setIsOpenCart(!isOpenCart)
        };
        setIsOpenAcc(!isOpenAcc)
    };

    const displayCart = () => {
        if (isOpenAcc) {
            setIsOpenAcc(!isOpenAcc)
        };
        if (isOpenCat) {
            setIsOpenCat(!isOpenCat)
        };
        setIsOpenCart(!isOpenCart)
    };

    const openCat = {
        transition: 'all 0.6s ease-in-out',
        transform: isOpenCat ? "translateY(0)" : "translateY(-200%)",
        position: 'absolute',
        zIndex: isOpenCat ? 1000 : -1000
    };

    const openAcc = {
        transition: 'all 0.6s ease-in-out',
        transform: isOpenAcc ? "translateY(0)" : "translateY(-200%)",
        position: 'absolute',
        zIndex: isOpenAcc ? 1000 : -1000
    };

    const openCart = {
        transition: 'all 0.6s ease-in-out',
        transform: isOpenCart ? "translateY(0)" : "translateY(-200%)",
        position: 'absolute',
        zIndex: isOpenCart ? 1000 : -1000
    };

    useEffect(() => {
        setIsOpenAcc(false);
        setIsOpenCart(false);
        setIsOpenCat(false);
    }, [location.pathname]);

    useEffect(() => {
        if (isAuthenticated) {
            setIsLoggedIn(true);  
        } else {
            setIsLoggedIn(false);
        }
    }, [isAuthenticated]);

    const productCategory = async (category) => {
        if (category === 0) {
            dispatch(getProducts());
            navigate('/');
        } else {
            dispatch(getProductByCategory(category));
            navigate('/'); 
        }
    }

    const homeButton = () => {
        dispatch(getProducts());
    }

    return (
        <div>
            <div className={styles.navbar}>
                <NavLink to='/' onClick={homeButton}><img src={logo_name} alt='E-Commerce Quick logo' /></NavLink>
                <SearchBar className={styles.search} />
                <div className={styles.btncontainer}>
                    <button onClick={displayCart} className={styles.button}><ShoppingCartOutlinedIcon /></button>
                    <button onClick={displayMenu} className={styles.button}><MenuOutlinedIcon /></button>
                    <button onClick={displayAccount} className={styles.button}><PersonOutlineOutlinedIcon /></button>
                </div>
            </div>
            <div className={styles.menu_container}>
                <Paper elevation={5} style={openCat} className={styles.menu}>
                    <h3>Categories</h3>
                    <ul className={styles.menu}>
                        <button onClick={() => productCategory(1)}>T-shirt</button>
                        <button onClick={() => productCategory(2)}>Shoes</button>
                        <button onClick={() => productCategory(3)}>Suits</button>
                        <button onClick={() => productCategory(0)}>All Products</button>
                    </ul>
                </Paper>
                <Paper elevation={5} style={openAcc} className={styles.menu}>
                    <h3>Account</h3>
                    {!isLoggedIn ? (
                        <ul className={styles.register}>
                            <li><NavLink to='/register'>Register</NavLink></li>
                            <li><NavLink to='/login'>Login</NavLink></li>
                        </ul>
                    ) : (
                        <ul className={styles.register}>
                        <li><NavLink to='/account'>Account Details</NavLink></li>
                        <li><NavLink to='/logout'>Logout</NavLink></li>
                    </ul>
                    )}

                </Paper>
                <Paper elevation={5} style={openCart} className={styles.menu}>
                    <h3>Cart</h3>
                    <Cart className={styles.menu} />
                </Paper>
            </div>
        </div>
    );
};

export default Header;