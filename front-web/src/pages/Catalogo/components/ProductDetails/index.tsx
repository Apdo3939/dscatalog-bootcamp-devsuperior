import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as ArrowIcon } from 'core/assets/images/seta.svg';
import './styles.scss';
import ProductPrice from 'core/components/ProductPrice';
import { Product } from 'core/Types/Product';
import ProductInfoLoader from '../Loaders/ProductInfoLoader';
import ProductDescriptionLoader from '../Loaders/ProductDescriptionLoader';
import { makeRequest } from 'core/utils/request';

type ParamsType = {
    productId: string;
}

const ProductDetails = () => {

    const { productId } = useParams<ParamsType>();
    const [product, setProduct] = useState<Product>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        makeRequest({ url: `/products/${productId}` })
            .then(response => setProduct(response.data))
            .finally(()=> setIsLoading(false));
    }, [productId]);

    return (
        <div className="products-details-container">
            <div className="card-base border-radius-20 products-details">
                <Link to="/products" className="products-details-goback">
                    <ArrowIcon className="icon-goback" />
                    <h1 className="text-goback">VOLTAR</h1>
                </Link>
                <div className="row">
                    <div className="col-6 pr-5">
                        <div className="products-details-card text-center">
                            {isLoading ? <ProductInfoLoader /> : <img src={product?.imgUrl} alt={product?.name} className="products-details-image" />}
                        </div>
                        <h1 className="products-details-name">{product?.name}</h1>
                        {product?.price && <ProductPrice price={product?.price} />}
                    </div>
                    <div className="col-6 products-details-card">
                        <h1 className="products-description-title">Descrição do Produto</h1>
                        <p className="products-description-text">
                            {isLoading ? <ProductDescriptionLoader /> : product?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default ProductDetails;