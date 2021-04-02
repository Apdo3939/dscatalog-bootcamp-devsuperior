import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import { Category, ProductResponse } from 'core/Types/Product';
import ProductCardLoader from './components/Loaders/ProductCardLoader';
import Pagination from 'core/components/Pagination';
import { makeRequest } from 'core/utils/request';
import ProductsFilters from 'core/components/ProductsFilters';
import './styles.scss';


const Catalogo = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivepage] = useState(0);
    const [name, setName] = useState('');
    const [category, setCategory] = useState<Category>();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 5,
            name: name,
            categoryId: category?.id
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductResponse(response.data))
            .finally(() => setIsLoading(false));

    }, [activePage, name, category])

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleChangename = (name: string) => {
        setActivepage(0);
        setName(name);
    }

    const handleChangeCategory = (category: Category) => {
        setActivepage(0);
        setCategory(category);
    }

    const clearFilters = () => {
        setActivepage(0);
        setName('');
        setCategory(undefined);
    }

    return (
        <div className="catalog-container">
            <div className="d-flex justify-content-between">
                <h1 className="catalog-title">Catalogo de produtos</h1>
                <ProductsFilters
                    name={name}
                    category={category}
                    handleChangename={handleChangename}
                    handleChangeCategory={handleChangeCategory}
                    clearFilters={clearFilters}
                />
            </div>
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