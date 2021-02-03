import React from 'react';
import { useHistory } from 'react-router-dom';
import './styles.scss';

type Props = {
    title: string;
    children: React.ReactNode;
}

const BaseForm = ({ title, children }: Props) => {

    const history = useHistory();
    const handleCancel = () => {
        history.push('../');
    }

    return (
        <div className="admin-baseform-container card-base">
            <h1 className="admin-baseform-title">{title}</h1>
            {children}
            <div className="admin-baseform-actions">
                <button
                    className="btn btn-outline-danger border-radius-10 mr-3"
                    onClick={handleCancel}
                >
                    cancelar
                </button>
                <button className="btn btn-primary border-radius-10 mr-3">
                    cadastrar
                </button>
            </div>
        </div>

    );
}

export default BaseForm;