import Pagination from 'core/components/Pagination';
import { UserResponse } from 'core/Types/Product';
import { makePrivateRequest} from 'core/utils/request';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import CardLoader from '../../Products/Loaders/ProductCardLoader';
import Card from '../Card';
import './styles.scss';

const ListUsers = () => {

    const [userResponse, setUserResponse] = useState<UserResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivepage] = useState(0);
    const history = useHistory();

    const getUsers = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 3,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        makePrivateRequest({ url: '/users', params })
            .then(response => setUserResponse(response.data))
            .finally(() => setIsLoading(false));

    }, [activePage]);

    const handlecreate = () => {
        history.push('/admin/users/create')
    }

    const onRemove = (userId: number) => {
        const confirm = window.confirm('Realmente deseja deletar este usuário?')
        if (confirm) {
            makePrivateRequest({ method: 'DELETE', url: `/users/${userId}` })
                .then(() => {
                    toast.success('Usuário deletado com sucesso');
                    getUsers();
                })
                .catch(() => {
                    toast.error('Falha ao deletar este usuário');
                });
        }
    }

    useEffect(() => {
        getUsers();
    }, [getUsers]);


    return (
        <div className="admin-user-list-container">
            <button className="btn btn-primary btn-lg" onClick={handlecreate}>
                Adicionar
            </button>
            <div className="admin-user-list-content">
                {isLoading ? <CardLoader /> : (
                    userResponse?.content.map(user => (
                        <Card
                            user={user} key={user.id}
                            onRemove={onRemove} />
                    ))
                )}
            </div>
            {userResponse &&
                <Pagination
                    totalpages={userResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivepage(page)}
                />
            }
        </div>
    );
}

export default ListUsers;