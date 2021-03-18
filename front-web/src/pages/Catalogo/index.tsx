import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';
import { ProductResponse } from 'core/Types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import { makeRequest } from 'core/utils/request';

const Catalogo = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivepage] = useState(0);

    useEffect(() => {
        const params = {
            page: activePage,
            linesPerPage: 5
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductResponse(response.data))
            .finally(() => setIsLoading(false));
    }, [activePage]);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catalogo de produtos</h1>
            <div className="catalog-products">
                {isLoading ? <ProductCardLoader /> : (productResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <ProductCard product={product} />
                    </Link>
                )))}
            </div>
            {productResponse && 
            <Pagination 
                totalpages={productResponse.totalPages}
                activePage={activePage}
                onChange={page => setActivepage(page)} />}
        </div>
    );
}



export default Catalogo;