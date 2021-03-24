import './styles.scss'
import imagem from '../../../../../core/assets/images/img.svg'
import ProductPrice from 'core/components/ProductPrice'

const Card = () => {
    return (
        <div className="card-base product-card-list">
            <div className="row">
                <div className="col-2 text-center border-right py-3">
                    <img src={imagem}
                        alt="exemplo de produto"
                        className="product-card-list-image"
                    />
                </div>
                <div className="col-7 py-3">
                    <h3 className="product-card-list-title">Computador I7</h3>
                    <ProductPrice price={1990.00} />
                    <div className="m2">
                        <span className="badge bg-secondary mx-1">Categoria 1</span>
                        <span className="badge bg-secondary mx-1">Categoria 1</span>
                        <span className="badge bg-secondary mx-1">Categoria 1</span>
                    </div>
                </div>
                <div className="col-3 pt-4 pr-5">
                    <button type="button"
                        className="btn btn-outline-secondary btn-block border-radius-10 mb-4 btn-edit">EDITAR</button>
                    <button type="button"
                        className="btn btn-outline-danger btn-block border-radius-10">EXCLUIR</button>
                </div>
            </div>
        </div>
    );
}

export default Card;