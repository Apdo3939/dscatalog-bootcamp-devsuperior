import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './core/components/navbar';
import Admin from './pages/Admin';
import Catalogo from './pages/Catalogo';
import ProductDetails from './pages/Catalogo/components/ProductDetails';
import Home from './pages/home';
import Auth from './pages/Auth';
import history from 'core/utils/history';
import PrivateRoute from 'core/components/Routes';


const Routes = () => (
    <Router history= {history}>
        <NavBar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/products" exact>
                <Catalogo />
            </Route>
            <Route path="/products/:productId">
                <ProductDetails />
            </Route>
            <Redirect from="/admin/auth" to="/admin/auth/login" exact/>
            <Route path="/admin/auth">
                <Auth />
            </Route>
            <Redirect from="/admin" to="/admin/products" exact/>
            <PrivateRoute path="/admin">
                <Admin />
            </PrivateRoute>
        </Switch>
    </Router>
);

export default Routes;