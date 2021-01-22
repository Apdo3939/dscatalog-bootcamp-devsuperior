import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './core/components/navbar';
import Admin from './pages/Admin';
import Catalogo from './pages/Catalogo';
import Home from './pages/home';

const Routes = () => (
    <BrowserRouter>
        <NavBar />
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/catalogo">
                <Catalogo />
            </Route>
            <Route path="/admin">
                <Admin />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Routes;