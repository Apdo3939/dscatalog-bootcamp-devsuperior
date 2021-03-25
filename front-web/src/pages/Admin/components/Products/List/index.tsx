import Pagination from 'core/components/Pagination';
import { ProductResponse } from 'core/Types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../Card';
import './styles.scss';

const ListProducts = () => {

    const [productResponse, setProductResponse] = useState<ProductResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivepage] = useState(0);
    const history = useHistory();

    const getProducts = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 3,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        makeRequest({ url: '/products', params })
            .then(response => setProductResponse(response.data))
            .finally(() => setIsLoading(false));

    }, [activePage]);

    const handlecreate = () => {
        history.push('/admin/products/create')
    }

    const onRemove = (productId: number) => {
        const confirm = window.confirm('Realmente deseja deletar este produto?')
        if (confirm) {
            makePrivateRequest({ method: 'DELETE', url: `/products/${productId}` })
                .then(() => {
                    toast.success('Produto deletado com sucesso');
                    getProducts();
                })
                .catch(() => {
                    toast.error('Falha ao deletar o produto')
                });
        }
    }

    console.log(isLoading);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div className="admin-product-list-container">
            <button className="btn btn-primary btn-lg" onClick={handlecreate}>
                Adicionar
            </button>
            <div className="admin-list-container">
                {productResponse?.content.map(product => (
                    <Card
                        product={product} key={product.id}
                        onRemove={onRemove} />
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