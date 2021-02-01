import React from 'react';
import { generateList } from 'core/utils/list';
import { ReactComponent as SetaIcon } from '../../assets/images/seta.svg';
import './styles.scss';

type Props = {
    totalpages: number;
    activePage: number;
    onChange: (item: number) => void;
}

const Pagination = ({ totalpages, activePage, onChange }: Props) => {
    const itens = generateList(totalpages);
    const previousClass = totalpages > 0 && activePage > 0 ? 'page-active':'page-inactive';
    const nextClass =  (activePage +1) < totalpages ? 'page-active':'page-inactive';
    return (
        <div className="pagination-container">
            <SetaIcon
                className={`pagination-previous ${previousClass}`}
                onClick={() => onChange(activePage - 1)}
            />
            {itens.map(item => (
                <div
                    key={item}
                    className={`pagination-item ${item === activePage ? 'active' : ''}`}
                    onClick={() => onChange(item)}
                >
                    {item + 1}
                </div>

            ))}
            <SetaIcon
                className={`pagination-next ${nextClass}`}
                onClick={() => onChange(activePage + 1)}
            />
        </div>
    );
}

export default Pagination