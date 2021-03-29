import { Category } from "core/Types/Product";
import { Link } from "react-router-dom";
import './styles.scss';


type Props = {
    category: Category;
    onRemove: (categoryId: number) => void;
}

const Card = ({ category, onRemove }: Props) => {

    return (
        <div className="card-base category-card-list">
            <div className="row">
                <div className="col-7">
                    <h3 className="category-card-list-title">{category.name}</h3>
                </div>
                <div className="col-5 text-center py-3 px-3">
                    <Link
                        to={`/admin/categories/${category.id}`}
                        type="button"
                        className="btn btn-outline-secondary border-radius-10 mx-3 category-card-list-button">
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger border-radius-10 mx-3 category-card-list-button"
                        onClick={() => onRemove(category.id)}>
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    );

}

export default Card;