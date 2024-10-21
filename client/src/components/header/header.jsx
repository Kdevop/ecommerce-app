// dependency imports
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

// styles, images and logos imports
import styles from '../header/header.module.css';
import logo_name from '../../assets/logo_name.jpg';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

// compoenent imports
import Cart from '../../pages/privateRoutes/cart';
import { userAuthDone } from '../../reduxStore/authSlice';
import { getProducts } from '../../reduxStore/productSlice';
import Category from '../category/category';
import AccountMenu from '../accountMenu/accountMenu';
import Login from '../login/login';
import Registration from '../register/register';

function Header() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [isOpenCat, setIsOpenCat] = useState(false);
    const [isOpenAcc, setIsOpenAcc] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showReg, setShowReg] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
    const loginRef = useRef(null);
    const regRef = useRef(null);

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

    const openLogin = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        transition: 'all 0.6s ease-in-out',
        transform: showLogin ? "translateY(0)" : "translateY(-200%)",
        position: 'absolute',
        zIndex: showLogin ? 1000 : -1000,
        marginTop: '10rem',

    };

    const openRegister = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        transition: 'all 0.6s ease-in-out',
        transform: showReg ? "translateY(0)" : "translateY(-200%)",
        position: 'absolute',
        zIndex: showReg ? 1000 : -1000,
        marginTop: '10rem'
    };

    useEffect(() => {
        setIsOpenAcc(false);
        setIsOpenCart(false);
        setIsOpenCat(false);
    }, [location.pathname]);

    const homeButton = () => {
        dispatch(getProducts());
    };

    const onLogin = () => {
        setShowLogin(prevState => !prevState);
    }

    const onReg = () => {
        setShowReg(!showReg);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            setTimeout(() => {
                if (
                    menuRef.current &&
                    !menuRef.current.contains(event.target) &&
                    !buttonRef.current.contains(event.target) &&
                    !event.target.classList.contains(styles.menu) &&
                    !event.target.classList.contains(styles.register) &&
                    !event.target.classList.contains(styles.button) &&
                    !event.target.classList.contains(styles.menu_container)
                ) {
                    setIsOpenCat(false);
                    setIsOpenAcc(false);
                    setIsOpenCart(false);
                }
            }, 500);
        };

        console.log('Handle Click Outside useEffect triggered');

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        let clickCount = 0;

        const loginHandleClickOutside = (event) => {
            clickCount++;
            if (clickCount === 1) {
                if (
                    loginRef.current &&
                    !loginRef.current.contains(event.target) &&
                    !event.target.classList.contains(styles.login)
                ) {
                    setShowLogin(false);

                }
                clickCount = 0; 
            }
        };

        console.log('Login Handle Click Outside useEffect triggered');

        document.addEventListener('mousedown', loginHandleClickOutside);

        return () => {
            document.removeEventListener('mousedown', loginHandleClickOutside);
        };
    }, []);

    useEffect(() => {
        let clickCount = 0;

        const regHandleClickOutside = (event) => {
            clickCount++;
            if (clickCount === 1) {
                if (
                    regRef.current &&
                    !regRef.current.contains(event.target) &&
                    !event.target.classList.contains(styles.reg)
                ) {

                    setShowReg(false);
                }
                clickCount = 0; 
            }
        };

        console.log('Login Handle Click Outside useEffect triggered');

        document.addEventListener('mousedown', regHandleClickOutside);

        return () => {
            document.removeEventListener('mousedown', regHandleClickOutside);
        };
    }, []);

    return (
        <div>
            <div style={openLogin} ref={loginRef}>
                <Login onLogin={onLogin} onReg={onReg} showLogin={showLogin} className={styles.login} />
            </div>
            <div style={openRegister} ref={regRef}>
                <Registration onLogin={onLogin} onReg={onReg} className={styles.reg} />
            </div>
            <div className={styles.navbar}>
                <NavLink to='/' onClick={homeButton}><img src={logo_name} alt='E-Commerce Quick logo' /></NavLink>
                <div className={styles.btncontainer} ref={buttonRef}>
                    <button onClick={displayCart} className={styles.button}><ShoppingCartOutlinedIcon /></button>
                    <button onClick={displayMenu} className={styles.button}><MenuOutlinedIcon /></button>
                    <button onClick={displayAccount} className={styles.button}><PersonOutlineOutlinedIcon /></button>
                </div>
            </div>
            <div className={styles.menu_container}>
                <Paper elevation={5} style={openCat} className={styles.menu} ref={menuRef}>
                    <h3>Categories</h3>
                    <Category className={styles.menu} />
                </Paper>
                <Paper elevation={5} style={openAcc} className={styles.menu} ref={menuRef}>
                    <h3>Account</h3>
                    <AccountMenu className={styles.menu} onLogin={onLogin} onReg={onReg} />

                </Paper>
                <Paper elevation={5} style={openCart}  className={styles.menu} ref={menuRef}>
                    <h3>Cart</h3>
                    <Cart className={styles.menu} onLogin={onLogin} onReg={onReg}/>
                </Paper>
            </div>
        </div>
    );
};

export default Header;