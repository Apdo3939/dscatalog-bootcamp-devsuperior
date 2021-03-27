import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import AuthCard from "../Card";
import './styles.scss';

type FormState = {
    username: string;
    usernameOk: string;
}

type LocationState = {
    from: string;
}


const Recover = () => {

    const { register, handleSubmit, errors } = useForm<FormState>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();
    const location = useLocation<LocationState>();

    const onSubmit = (data: FormState) => {
        console.log(data);
    }

    return (
        <AuthCard title="Recuperação">

            {hasError && (
                <div className="alert alert-danger mt-5">
                    Emails digitados não conferem!
                </div>
            )}

            <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                <div className="margin-bottom-30">
                    <input
                        name="username"
                        ref={register({
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                        type="email"
                        className={`form-control input-base ${errors.username ? 'is-invalid' : ''} `}
                        placeholder="Digite o Email Cadastrado"
                    />
                    {errors.username && <div className="invalid-feedback d-block">
                        {errors.username.message}
                    </div>}
                </div>

                <div className="margin-bottom-30">
                    <input
                        name="usernameOk"
                        ref={register({
                            required: "Campo obrigatório",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                        type="email"
                        className={`form-control input-base ${errors.usernameOk ? 'is-invalid' : ''} `}
                        placeholder="Repita o Email Cadastrado"
                    />
                    {errors.usernameOk && <div className="invalid-feedback d-block">
                        {errors.usernameOk.message}
                    </div>}
                    <div className="recover-button">
                        <button
                            type="button"
                            className="btn btn-outline-danger border-radius-10 recover-button-cancelar"
                            onClick={() => { console.log('cancelado') }}>
                            CANCELAR
                        </button>
                        <Link
                            to={'/admin'}
                            type="button"
                            className="btn btn-primary border-radius-10 recover-button-enviar">
                            ENVIAR
                        </Link>
                    </div>
                </div>

            </form>
        </AuthCard>
    );
}
export default Recover;