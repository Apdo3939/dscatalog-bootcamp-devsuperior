import ButtonIcon from 'core/components/ButtonIcon';
import { saveSessiondata } from 'core/utils/auth';
import { makeLogin } from 'core/utils/request';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import AuthCard from '../Card';
import './styles.scss';

type FormData = {
    username: string;
    password: string;
}

const Login = () => {

    const { register, handleSubmit } = useForm<FormData>();
    const [hasError, setHasError] = useState(false);
    const history = useHistory();

    const onSubmit = (data: FormData) => {
        makeLogin(data)
        .then((response) => {
            setHasError(false);
            saveSessiondata(response.data);
            history.push('/admin');
        })
        .catch(() => {
            setHasError(true)
        });
    }

    return (
        <div>
            <AuthCard title="Login">

                {hasError && (
                    <div className="alert alert-danger mt-5">
                        Usuário ou senha inválidas!
                    </div>
                )}
                <form className="form-login"
                    onSubmit={handleSubmit(onSubmit)}>
                    <input
                        name="username"
                        ref={register({required : true})}
                        type="email"
                        className="form-control input-base margin-bottom-30"
                        placeholder="Email"
                    />
                    <input
                        name="password"
                        ref={register({required : true})}
                        type="password"
                        className="form-control input-base"
                        placeholder="Senha"
                    />
                    <Link to="/admin/auth/recover" className="login-link-recover">Esqueci a senha?</Link>
                    <div className="login-submmit">
                        <ButtonIcon text="Logar" />
                    </div>
                    <div className="text-center">
                        <span className="not-registered">
                            Não tem Cadastro?
                        </span>
                        <Link to="/admin/auth/register" className="login-link-register">CADASTRAR</Link>
                    </div>

                </form>
            </AuthCard>
        </div>
    );
};

export default Login;