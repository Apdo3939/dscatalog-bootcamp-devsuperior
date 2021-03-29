import { makePrivateRequest } from 'core/utils/request';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import BaseForm from '../../baseForm';
import './styles.scss';

export type FormState = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
}

type ParamsType = {
    userId: string
}

const Form = () => {
    const { register, handleSubmit, errors, setValue } = useForm<FormState>();
    const history = useHistory();
    const { userId } = useParams<ParamsType>();
    const isEditing = userId !== 'create';
    const title = isEditing ? 'Editar Usuário' : 'Cadastrar Usuário';

    useEffect(() => {
        if (isEditing) {
            makePrivateRequest({ url: `/users/${userId}` })
                .then(response => {
                    setValue('firstName', response.data.firstName);
                    setValue('lastName', response.data.lastName);
                    setValue('email', response.data.email);
                    setValue('password', response.data.password);
                })
        }
    }, [isEditing, userId, setValue]);

    const onSubmit = (formData: FormState) => {
        makePrivateRequest({
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/users/${userId}` : '/users',
            data: formData
        })
            .then(() => {
                toast.info("Usuário cadastrado com sucesso!!!");
                history.push('/admin/users');
            })
            .catch(() => {
                toast.error("Erro ao cadastrar usuário!!!");
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title={title}>
                <div className="row">
                    <div className="col-6">
                        <div className="mt-5">
                            {errors.firstName && (
                                <div className="invalid-feedback d-block">
                                    {errors.firstName.message}
                                </div>
                            )}
                            <input
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: { value: 5, message: "Nome não deve ser menor que 5 caracteres" },
                                    maxLength: { value: 60, message: "Nome não deve ser maior que 60 caracteres" }
                                })}
                                name="firstName"
                                type="text"
                                className="form-control input-base"
                                placeholder="Nome"
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mt-5">
                            {errors.lastName && (
                                <div className="invalid-feedback d-block">
                                    {errors.lastName.message}
                                </div>
                            )}
                            <input
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: { value: 5, message: "Nome não deve ser menor que 5 caracteres" },
                                    maxLength: { value: 60, message: "Nome não deve ser maior que 60 caracteres" }
                                })}
                                name="lastName"
                                type="text"
                                className="form-control input-base"
                                placeholder="Sobrenome"
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mt-4">
                        {errors.email && (
                            <div className="invalid-feedback d-block">
                                {errors.email.message}
                            </div>
                        )}
                        <input
                            ref={register({
                                required: "Campo Obrigatório",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido"
                                }
                            })}
                            name="email"
                            type="email"
                            className="form-control input-base"
                            placeholder="Digite aqui o seu email"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="mt-4 mb-5">
                            {errors.password && (
                                <div className="invalid-feedback d-block">
                                    {errors.password.message}
                                </div>
                            )}
                            <input
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: { value: 8, message: "Senha não deve ser menor que 8 caracteres" }
                                })}
                                name="password"
                                type="password"
                                className="form-control input-base"
                                placeholder="Digite aqui a sua senha"
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mt-4 mb-5">
                            {errors.passwordConfirm && (
                                <div className="invalid-feedback d-block">
                                    {errors.passwordConfirm.message}
                                </div>
                            )}
                            <input
                                ref={register({
                                    required: "Campo Obrigatório",
                                    minLength: { value: 8, message: "Senha não confere" }
                                })}
                                name="passwordConfirm"
                                type="password"
                                className="form-control input-base"
                                placeholder="Repita aqui a sua senha"
                            />
                        </div>
                    </div>
                </div>
            </BaseForm>
        </form>
    );
}

export default Form;