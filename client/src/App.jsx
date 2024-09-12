import './App.css';
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements, } from 'react-router-dom';
import Root from './root/root';
import Home from './pages/publicRoutes/home';
import Login from './pages/publicRoutes/login';
import ProductDetails from '../src/pages/publicRoutes/productDetails';
import Registration from '../src/pages/publicRoutes/registration';
import Account from './pages/privateRoutes/userDetails';
import Checkout from './pages/privateRoutes/checkout';
import Orders from './pages/privateRoutes/orders';
import OrderDetails from './pages/privateRoutes/orderDetails';
import Logout from './components/logout/logout';


const appRouter=createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Root />}>
    {/* Public Routes */}
    <Route index element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/products/:id' element={<ProductDetails />} />
    <Route path='/register' element={<Registration />} />
    <Route path='/logout' element={<Logout />} /> 
    {/* should the logout be a protected route? maybe. will have a think. */}

    {/* Private Routes */}
    <Route exact path='/account' element={<Account />} />
    <Route exact path='/cart' />
    <Route exact path='/checkout' element={<Checkout />} />
    <Route exact path='/orders' element={<Orders />} />
    <Route exact path='/orders/:orderId' element={<OrderDetails />} />
  </Route>
))


function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;