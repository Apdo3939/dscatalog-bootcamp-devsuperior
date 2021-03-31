import { makePrivateRequest, makeRequest } from 'core/utils/request';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import Select from 'react-select';
import BaseForm from '../../baseForm';
import { Category } from 'core/Types/Product';
import './styles.scss';
import PriceField from './PriceField';
import ImageUpload from '../ImageUpload';

export type FormState = {
    name: string;
    price: string;
    categories: Category[];
    description: string;
    imgUrl: string;
}

type ParamsType = {
    productId: string
}

const Form = () => {

    const { register, handleSubmit, errors, setValue, control } = useForm<FormState>();
    const history = useHistory();
    const { productId } = useParams<ParamsType>();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [uploadedImgUrl, setUploadedImgUrl] = useState('');
    const [productImgUrl, setproductImgUrl] = useState('');
    const isEditing = productId !== 'create';
    const title = isEditing ? 'Editar Produto' : 'Cadastrar Produto';

    useEffect(() => {
        setIsLoadingCategories(true);
        makeRequest({ url: '/categories' })
            .then(response => setCategories(response.data.content))
            .finally(() => setIsLoadingCategories(false));

    }, []);

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/products/${productId}` })
                .then(response => {
                    setValue('name', response.data.name);
                    setValue('price', response.data.price);
                    setValue('categories', response.data.categories);
                    setValue('description', response.data.description);
                    setproductImgUrl(response.data.imgUrl);
                });
        }
    }, [productId, isEditing, setValue]);

    const onSubmit = (formData: FormState) => {

        const payload = {
            ...formData,
            imgUrl: uploadedImgUrl
        }

        makePrivateRequest({
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/products/${productId}` : '/products',
            data: payload
        })
            .then(() => {
                toast.info("Produto cadastrado com sucesso!!!");
                history.push('/admin/products');
            })
            .catch(() => {
                toast.error("Erro ao cadastrar produto!!!");
            });
    }

    const onUploadSuccess = (imgUrl: string) => {
        setUploadedImgUrl(imgUrl);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={title}>
                <div className="row">
                    <div className="col-6">
                        <div className="mt-4 mb-3">
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                            <input
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: { value: 5, message: "Nome não deve ser menor que 5 caracteres" },
                                    maxLength: { value: 60, message: "Nome não deve ser maior que 60 caracteres" }
                                })}
                                name="name"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do produto"
                            />
                        </div>
                        <div className="mb-3">
                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Por favor, escolher uma categoria
                                </div>
                            )}
                            <Controller
                                as={Select}
                                name="categories"
                                rules={{ required: true }}
                                control={control}
                                isLoading={isLoadingCategories}
                                options={categories}
                                getOptionLabel={(option: Category) => option.name}
                                getOptionValue={(option: Category) => String(option.id)}
                                isMulti
                                placeholder="Categoria"
                                classNamePrefix="categories-select"
                                defaultValue=""
                            />
                        </div>
                        <div className="mb-3">
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                            <PriceField
                                control={control}
                            />
                        </div>
                        <div className="mt-1">
                            <ImageUpload onUploadSuccess={onUploadSuccess} productImgUrl={productImgUrl} />
                        </div>
                    </div>
                    <div className="col-6 mt-4">
                        {errors.description && (
                            <div className="invalid-feedback d-block">
                                {errors.description.message}
                            </div>
                        )}
                        <textarea
                            ref={register({ required: "Campo Obrigatório" })}
                            name="description"
                            placeholder="Descrição"
                            className="form-control input-base"
                            cols={30}
                            rows={11} />
                    </div>
                </div>
            </BaseForm>
        </form>
    );

}
export default Form;