import Pagination from 'core/components/Pagination';
import { CategoryResponse } from 'core/Types/Product';
import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import CardLoader from '../../Products/Loaders/ProductCardLoader';
import Card from '../Card';
import './styles.scss';

const ListCategories = () => {

    const [categoryResponse, setCategoryResponse] = useState<CategoryResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [activePage, setActivepage] = useState(0);
    const history = useHistory();

    const getCategories = useCallback(() => {
        const params = {
            page: activePage,
            linesPerPage: 5,
            direction: 'DESC',
            orderBy: 'id'
        }
        setIsLoading(true);
        makeRequest({ url: '/categories', params })
            .then(response => setCategoryResponse(response.data))
            .finally(() => setIsLoading(false));

    }, [activePage]);

    const handlecreate = () => {
        history.push('/admin/categories/create')
    }

    const onRemove = (categoryId: number) => {
        const confirm = window.confirm('Realmente deseja deletar esta categoria?')
        if (confirm) {
            makePrivateRequest({ method: 'DELETE', url: `/categories/${categoryId}` })
                .then(() => {
                    toast.success('Categoria deletada com sucesso');
                    getCategories();
                })
                .catch(() => {
                    toast.error('Falha ao deletar a categoria')
                });
        }
    }

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <div className="admin-category-list-container">
            <button className="btn btn-primary btn-lg" onClick={handlecreate}>
                Adicionar
            </button>
            <div className="admin-category-list-content">
                {isLoading ? <CardLoader /> : (
                    categoryResponse?.content.map(category => (
                        <Card
                            category={category} key={category.id}
                            onRemove={onRemove} />
                    ))
                )}
            </div>
            {categoryResponse &&
                <Pagination
                    totalpages={categoryResponse.totalPages}
                    activePage={activePage}
                    onChange={page => setActivepage(page)}
                />
            }
        </div>
    );

}

export default ListCategories;