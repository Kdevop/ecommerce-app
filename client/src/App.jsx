import './App.css';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Root from './root/root';
import Home from './pages/publicRoutes/home';
import ProductDetails from '../src/pages/publicRoutes/productDetails';
import Account from './pages/privateRoutes/accountPage';
import Checkout from './pages/privateRoutes/checkout';
import Orders from './pages/privateRoutes/orders';
import OrderDetails from './pages/privateRoutes/orderDetails';
import Logout from './components/logout/logout';
import UserDetails from './pages/privateRoutes/userDetails';
import Success from './pages/privateRoutes/success';
import Cancel from './pages/privateRoutes/cancel';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { checkUser, userAuthDone } from './reduxStore/authSlice';


const appRouter=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    {/* Public Routes */}
    <Route index element={<Home />} />
    <Route path='/products/:id' element={<ProductDetails />} />
    <Route path='/logout' element={<Logout />} /> 
    {/* should the logout be a protected route? maybe. will have a think. */}

    {/* Private Routes */}
    <Route exact path='/account' element={<Account />} />
    <Route exact path='/userdetails' element={<UserDetails />}/>
    <Route exact path='/cart' />
    <Route exact path='/checkout' element={<Checkout />} />
    <Route exact path='/orders' element={<Orders />} />
    <Route exact path='/orders/:orderId' element={<OrderDetails />} />
    <Route exact path='/success/:session_id' element={<Success/>} />
    <Route exact path='/cancel/:session_id' element={<Cancel />} />
  </Route>
)) 


function App() {
  const dispatch = useDispatch();
  const signInComplete = useSelector(userAuthDone);

  useEffect(() => {

    if(!signInComplete) {
      dispatch(checkUser());
    }

  }, [dispatch, signInComplete]);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;