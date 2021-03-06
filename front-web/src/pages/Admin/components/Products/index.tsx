import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Form from './Form';
import ListProducts from './List';
import './styles.scss';

const AdminProducts = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/products" exact>
                    <ListProducts />
                </Route>
                <Route path="/admin/products/:productId">
                    <Form />
                </Route>
            </Switch>
        </div>
    );
}

export default AdminProducts;