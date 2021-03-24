import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/Types/Product';
import { makeRequest } from 'core/utils/request';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../Card';
import './styles.scss';

const ListProducts = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivepage] = useState(0);
    const history = useHistory();

    const handlecreate = () => {
        history.push('/admin/products/create')
    }

    console.log(isLoading);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 3
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductResponse(response.data))
            .finally(() => setIsLoading(false));
    }, [activePage]);

    return (
        <div className="admin-product-list-container">
            <button className="btn btn-primary btn-lg" onClick={handlecreate}>
                Adicionar
            </button>
            <div className="admin-list-container">
                {productResponse?.content.map(product => (
                    <Card product={product} key={product.id} />
                ))}
            </div>
            {productResponse &&
                <Pagination
                    totalpages={productResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivepage(page)}
                />
            }
        </div>
    );
}
export default ListProducts;