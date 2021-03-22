import { makePrivateRequest } from 'core/utils/request';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import BaseForm from '../../baseForm';
import './styles.scss';


type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
    imgUrl: string;
}


const Form = () => {

    const { register, handleSubmit, errors } = useForm<FormState>();
    const history = useHistory(); 
    
    const onSubmit = (formData: FormState) => {
        makePrivateRequest({ method: 'POST', url: '/products', data: formData })
        .then(()=>{
            toast.info("Produto cadastrado com sucesso!!!");
            history.push('/admin/products');
        })
        .catch(() =>{
            toast.error("Erro ao cadastrar produto!!!");
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="Cadastrar um Produto">

                <div className="row">
                    <div className="col-6">
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
                                    maxLength:{value: 60, message: "Nome não deve ser maior que 60 caracteres"}
                                })}
                                name="name"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome do produto"
                            />
                        </div>
                        <div className="mb-4">
                            {errors.category && (
                                <div className="invalid-feedback d-block">
                                    {errors.category.message}
                                </div>
                            )}
                            <input
                                ref={register({
                                    required: "Campo Obrigatório"
                                })}
                                name="category"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome da Categoria"
                            />
                        </div>
                        <div className="mb-4">
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                            <input
                                ref={register({ required: "Campo Obrigatório" })}
                                name="price"
                                type="number"
                                className="form-control input-base"
                                placeholder="Preço do produto"
                            />
                        </div>

                        <div className="mt-4">
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                            <input
                                ref={register({ required: "Campo Obrigatório" })}
                                name="imgUrl"
                                type="text"
                                className="form-control input-base"
                                placeholder="Endereço da imagem"
                            />
                        </div>
                    </div>
                    <div className="col-6 mt-5">
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