import { ReactComponent as SearchIcon } from 'core/assets/images/search.svg';
import { Category } from 'core/Types/Product';
import { makeRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import './styles.scss';

type Props = {
    name?: string
    category?: Category
    handleChangename: (name: string) => void
    handleChangeCategory: (category: Category) => void
    clearFilters: () => void
}

const ProductsFilters = ({ name, category, handleChangename, handleChangeCategory, clearFilters }: Props) => {

    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));

    }, []);

    return (
        <div className="card-base products-filters-container">
            <div className="input-search">
                <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Digite aqui a sua pesquisa"
                    onChange={event => handleChangename(event.target.value)}
                />
                <SearchIcon className="ml-1" />
            </div>
            <Select
                name="categories"
                key={`select-${category?.id}`}
                value={category}
                rules={{ required: true }}
                isLoading={isLoadingCategories}
                options={categories}
                getOptionLabel={(option: Category) => option.name}
                getOptionValue={(option: Category) => String(option.id)}
                inputId="categories"
                placeholder="Categoria"
                className="categories-select-container"
                classNamePrefix="products-categories-select"
                onChange={value => handleChangeCategory(value as Category)}
                isClearable
            />
            <button
                className="btn btn-outline-secondary border-radius-10"
                onClick={clearFilters}>
                <strong>LIMPAR FILTRO</strong>
            </button>
        </div>
    );
}

export default ProductsFilters;