import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {ReactComponent as ArrowIcon} from '../../../../core/assets/images/seta.svg';
import {ReactComponent as ProductImage} from '../../../../core/assets/images/product.svg';
import './styles.scss';
import ProductPrice from '../../../../core/components/ProductPrice';

type ParamsType = {
    productId: string;
}

const ProductDetails = () => {

    const {productId} = useParams<ParamsType>();
    console.log(productId);
    return(
        <div className="products-details-container">
            <div className="card-base border-radius-20 products-details">
                <Link to= "/products" className="products-details-goback">
                <ArrowIcon className="icon-goback" />
                <h1 className="text-goback">VOLTAR</h1>
                </Link>
                <div className="row">
                    <div className="col-6 pr-5">
                        <div className="products-details-card text-center">
                            <ProductImage className="products-details-image" />
                        </div>  
                        <h1 className="products-details-name">Computador Desktop - Intel Core i7</h1>
                        <ProductPrice price="2.779,00" />
                    </div>
                    <div className="col-6 products-details-card">
                        <h1 className="products-description-title">Descrição do Produto</h1>
                        <p className="products-description-text">
                        Seja um mestre em multitarefas com a capacidade para exibir quatro aplicativos simultâneos na tela. A tela está ficando abarrotada? Crie áreas de trabalho virtuais para obter mais espaço e trabalhar com os itens que você deseja. Além disso, todas as notificações e principais configurações são reunidas em uma única tela de fácil acesso.
                        </p>
                    </div>
                </div>
            </div>           
        </div>
    );
}
   


export default ProductDetails;