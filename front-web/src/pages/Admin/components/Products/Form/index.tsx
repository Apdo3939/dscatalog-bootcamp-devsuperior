import React, { useState } from 'react';
import BaseForm from '../../baseForm';
import './styles.scss';



const Form = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleOnChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    }

    const handleOnChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(event.target.value);
    }

    return (
        <BaseForm title="Cadastrar um Produto">

            <div className="row">
                <div className="col-6">
                    <input
                        value={name}
                        type="text"
                        className="form-control mt-5 mb-5"
                        onChange={handleOnChange}
                        placeholder="Nome do produto"
                    />

                    <select
                        value={category}
                        className="form-control mb-5"
                        onChange={handleOnChangeCategory}
                    >
                       <option value="Books">Books</option> 
                       <option value="NoteBook">NoteBook</option>
                       <option value="Computers">Computers</option>
                       <option value="Games">Games</option>
                       <option value="Consoles">Consoles</option>
                    </select>

                    <input
                        value={price}
                        type="text"
                        className="form-control mb-5"
                        onChange={handleOnChangePrice}
                        placeholder="Preço do produto"
                    />
                </div>
                <div className="col-6">
                    <h4 className="mt-5 mb-5" >Nome do produto: {name}</h4>
                    <h4 className="mb-5">Preço do produto: {price}</h4>
                    <h4 className="mb-5">Categoria do produto: {category}</h4>
                </div>
            </div>
        </BaseForm>
    );

}
export default Form;