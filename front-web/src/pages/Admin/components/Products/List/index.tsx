import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import './styles.scss';

const ListProducts = () => {

    const history = useHistory();
    const handlecreate = () => {
        history.push('/admin/products/create')
    }

    return (
        <div className="admin-product-list-container">
            <button className="btn btn-primary btn-lg" onClick={handlecreate}>
                Adicionar
            </button>
            <div className="admin-list-container">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
    );
}
export default ListProducts;