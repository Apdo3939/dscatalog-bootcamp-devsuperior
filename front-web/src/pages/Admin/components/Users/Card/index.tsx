import { User } from 'core/Types/Product';
import { Link } from 'react-router-dom';
import './styles.scss';

type Props = {
    user: User;
    onRemove: (userId: number) => void;
}

const Card = ({ user, onRemove }: Props) => {
    return (
        <div className="card-base user-card-list">
            <div className="row">
                <div className="col-7">
                    <h3 className="user-card-list-title">{user.firstName} {user.lastName}</h3>
                    <h6 className="user-card-list-text">{user.email}</h6>
                </div>
                <div className="col-5 text-center py-3 px-3">
                    <Link
                        to={`/admin/users/${user.id}`}
                        type="button"
                        className="btn btn-outline-secondary border-radius-10 mx-3 user-card-list-button-edit">
                        EDITAR
                    </Link>
                    <button
                        type="button"
                        className="btn btn-outline-danger border-radius-10 mx-3 user-card-list-button"
                        onClick={() => onRemove(user.id)}>
                        EXCLUIR
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;