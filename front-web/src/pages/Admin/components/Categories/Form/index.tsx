import { makePrivateRequest, makeRequest } from "core/utils/request";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import BaseForm from "../../baseForm"
import './styles.scss';


export type FormState = {
    name: string;
}

type ParamsType = {
    categoryId: string
}

const Form = () => {

    const { register, handleSubmit, errors, setValue} = useForm<FormState>();
    const history = useHistory();
    const { categoryId } = useParams<ParamsType>();
    const isEditing = categoryId !== 'create';
    const title = isEditing ? 'Editar Categoria' : 'Cadastrar Categoria';

    useEffect(() => {
        if (isEditing) {
            makeRequest({ url: `/categories/${categoryId}` })
                .then(response => {
                    setValue('name', response.data.name);
                });
        }
    }, [categoryId, isEditing, setValue]);

    const onSubmit = (formData: FormState) => {
        makePrivateRequest({
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/categories/${categoryId}` : '/categories',
            data: formData
        })
            .then(() => {
                toast.info("Categoria cadastrada com sucesso!!!");
                history.push('/admin/categories');
            })
            .catch(() => {
                toast.error("Erro ao cadastrar categoria!!!");
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={title}>
                <div className="mt-5 mb-4">
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
                        placeholder="Nome da categoria"
                    />
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;