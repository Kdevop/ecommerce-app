import React from 'react';
import Header from '../components/header/header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/footer';

const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer/>
        </>
    )
}

export default Root;