import makeRequest from 'core/utils/request';
import React, { useState } from 'react';
import BaseForm from '../../baseForm';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    category: string;
    description: string;
}

type FormEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>;


const Form = () => {

    const [formData, setFormData] = useState<FormState>({
        name: '',
        price: '',
        category: '',
        description: ''
    });

    const handleOnChange = (event: FormEvent) => {
        const name = event.target.name;
        const value = event.target.value;

        console.log({ name, value });
        setFormData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            ...formData,
            imgUrl: "https://s2.glbimg.com/eobHZ4SIZHjHZfltpLHlJ6cMBVM=/0x600/s.glbimg.com/po/tt2/f/original/2015/06/29/360.jpg",
            categories: [{ id: formData.category }],
        }

        makeRequest({ method: 'POST', url: '/products', data: payload })
            .then(() => { setFormData({ name: '', price: '', category: '', description: '' }) });
    }

    return (
        <form onSubmit={handleSubmit}>
            <BaseForm title="Cadastrar um Produto">

                <div className="row">
                    <div className="col-6">
                        <input
                            value={formData.name}
                            name="name"
                            type="text"
                            className="form-control mt-5 mb-5"
                            onChange={handleOnChange}
                            placeholder="Nome do produto"
                        />

                        <select
                            value={formData.category}
                            name="category"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                        >
                            <option value="1">Books</option>
                            <option value="2">Eletrônics</option>
                            <option value="3">Computers</option>
                        </select>

                        <input
                            value={formData.price}
                            name="price"
                            type="text"
                            className="form-control mb-5"
                            onChange={handleOnChange}
                            placeholder="Preço do produto"
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            value={formData.description}
                            name="description"
                            onChange={handleOnChange}
                            cols={30}
                            rows={10} />
                    </div>
                </div>
            </BaseForm>
        </form>
    );

}
export default Form;