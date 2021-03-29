import PrivateRoute from 'core/components/Routes';
import React from 'react';
import {Switch } from 'react-router-dom';
import AdminCategories from './components/Categories';
import Navbar from './components/navbar';
import AdminProducts from './components/Products';
import AdminUsers from './components/Users';
import './styles.scss';

const Admin = () => (
   
    <div className="admin-container">
        <Navbar />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <AdminProducts />
                </PrivateRoute>
                <PrivateRoute path="/admin/categories">
                    <AdminCategories />
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <AdminUsers />
                </PrivateRoute>
            </Switch>
        </div>
    </div>
);

export default Admin;