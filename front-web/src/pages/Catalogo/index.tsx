import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import './styles.scss';
import makeRequest from '../../core/utils/request';
import { ProductResponse } from '../../core/Types/Product';

const Catalogo = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    console.log(productResponse);

    useEffect(() => {
        const params = {
            page: 0,
            linesPerPage: 8
        }
        makeRequest({ url: '/products', params })
            .then(response => setProductResponse(response.data));
    }, []);

    return (
        <div className="catalog-container">
            <h1 className="catalog-title">Catalogo de produtos</h1>
            <div className="catalog-products">
                {productResponse?.content.map(product => (
                    <Link to={`/products/${product.id}`} key= {product.id}>
                        <ProductCard product={product} />
                    </Link>
                ))}

            </div>
        </div>
    );
}



export default Catalogo;