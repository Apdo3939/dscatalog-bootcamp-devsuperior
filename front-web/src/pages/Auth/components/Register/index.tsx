import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormState = {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

type LocationState = {
    from: string;
}

const Register = () => {

    const { register, handleSubmit, errors } = useForm<FormState>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();

    return (
        <AuthCard title="CADASTRO">
            {hasError && (
                <div className="alert alert-danger mt-5">
                    Emails digitados não conferem!
                </div>
            )}

            <form className="form-login" >
                <div className="margin-bottom-20">
                    <input
                        name="firstname"
                        ref={register({
                            required: "Campo obrigatório"
                        })}
                        type="text"
                        className={`form-control input-base ${errors.firstname ? 'is-invalid' : ''} `}
                        placeholder="Nome"
                    />
                    {errors.firstname && <div className="invalid-feedback d-block">
                        {errors.firstname.message}
                    </div>}
                </div>

                <div className="margin-bottom-20">
                    <input
                        name="lastname"
                        ref={register({
                            required: "Campo obrigatório"
                        })}
                        type="text"
                        className={`form-control input-base ${errors.lastname ? 'is-invalid' : ''} `}
                        placeholder="Sobrenome"
                    />
                    {errors.lastname && <div className="invalid-feedback d-block">
                        {errors.lastname.message}
                    </div>}
                </div>
                <div className="margin-bottom-20">
                    <input
                        name="username"
                        ref={register({
                            required: "Campo obrigatório"
                        })}
                        type="email"
                        className={`form-control input-base ${errors.username ? 'is-invalid' : ''} `}
                        placeholder="Email"
                    />
                    {errors.username && <div className="invalid-feedback d-block">
                        {errors.username.message}
                    </div>}
                </div>
                <div className="margin-bottom-20">
                    <input
                        name="password"
                        ref={register({
                            required: "Campo obrigatório"
                        })}
                        type="password"
                        className={`form-control input-base ${errors.password ? 'is-invalid' : ''} `}
                        placeholder="Digite aqui a sua senha"
                    />
                    <span className="Register-span-text">A sua senha deve ter pelo menos 8 caracteres e conter pelo menos um número</span>
                    {errors.password && <div className="invalid-feedback d-block">
                        {errors.password.message}
                    </div>}
                </div>
                <div className="margin-bottom-20">
                    <input
                        name="password"
                        ref={register({
                            required: "Campo obrigatório"
                        })}
                        type="password"
                        className={`form-control input-base ${errors.password ? 'is-invalid' : ''} `}
                        placeholder="Repita aqui a sua senha"
                    />
                    {errors.password && <div className="invalid-feedback d-block">
                        {errors.password.message}
                    </div>}
                </div>
                <div className="recover-button">
                    <button
                        type="button"
                        className="btn btn-outline-danger border-radius-10 register-button-cancelar"
                        onClick={() => { console.log('cancelado') }}>
                        CANCELAR
                        </button>
                    <Link
                        to={'/admin'}
                        type="button"
                        className="btn btn-primary border-radius-10 register-button-cadastrar">
                        CADASTRAR
                    </Link>
                </div>
            </form>
        </AuthCard>
    );
}

export default Register;