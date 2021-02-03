import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

const ListProducts = () => {

    const history = useHistory();
    const handlecreate = () =>{
        history.push('/admin/products/create')
    }

    return (
        <div className="admin-product-list-container">
            <button className="btn btn-primary btn-lg" onClick={handlecreate}>
                Adicionar
            </button>
        </div>
    );
}
export default ListProducts;